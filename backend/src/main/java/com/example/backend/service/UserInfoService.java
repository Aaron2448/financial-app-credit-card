package com.example.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.backend.models.UserInfo;
import com.example.backend.repository.UserInfoRepository;
import com.example.backend.services.CardAccountService;
import com.example.backend.services.RepaymentService;
import com.example.backend.services.TransactionService;

@Service
public class UserInfoService {

	@Autowired
	private UserInfoRepository userInfoRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private CardAccountService cardAccountService;
	
	@Autowired
	private RepaymentService repaymentService;
	

	public String addUser(UserInfo request) {

		UserInfo userInfo = new UserInfo();
		userInfo.setUserFirstname(request.getUserFirstname());
		userInfo.setUserLastname(request.getUserLastname());
		userInfo.setEmail(request.getEmail());
		userInfo.setPassword(passwordEncoder.encode(request.getPassword()));
		userInfo.setUserMobilePhoneNo(request.getUserMobilePhoneNo());
		userInfo.setUserDob(request.getUserDob());

		try {

			userInfoRepository.save(userInfo);
			return "User added to database.";

		} catch (Exception e) {

			return "Email already exists.";

		}

	}

	public UserInfo findById(Long id) {
		return this.userInfoRepository.findById(id).orElseThrow();
	}

	public String updateUserInfo(UserInfo userInfo) {
		UserInfo foundUserInfo = this.userInfoRepository.findById(userInfo.getId()).orElseThrow();
		if (!foundUserInfo.getEmail().equals(userInfo.getEmail())) {
			if (userInfoRepository.existsByEmail(userInfo.getEmail())) {
				return "An account already exists with this email.";
			}
		}
		foundUserInfo.setUserFirstname(userInfo.getUserFirstname());
		foundUserInfo.setUserLastname(userInfo.getUserLastname());
		foundUserInfo.setUserMobilePhoneNo(userInfo.getUserMobilePhoneNo());
		foundUserInfo.setEmail(userInfo.getEmail());
		this.userInfoRepository.save(foundUserInfo);
		return "Updated user details";
	}

	public boolean existsByEmail(String email) {
		return this.userInfoRepository.existsByEmail(email);
	}

	public String updatePassword(UserInfo userInfo) {
		UserInfo foundUserInfo = this.userInfoRepository.findById(userInfo.getId()).orElseThrow();
		foundUserInfo.setPassword(passwordEncoder.encode(userInfo.getPassword()));
		foundUserInfo.setResetRecently("no");
		this.userInfoRepository.save(foundUserInfo);
		return "Updated user password";
	}

	public void update2FAStatus(String email, boolean status) {
		UserInfo foundUser = userInfoRepository.findByEmail(email)
				.orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
		foundUser.setUse2FA(status);
		this.userInfoRepository.save(foundUser);
	}

	public UserInfo findByEmail(String email) {
		return userInfoRepository.findByEmail(email)
				.orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
	}

	public void checkCardUpdate(String email) {
		Long userInfoId = this.findByEmail(email).getId();
		
		this.cardAccountService.checkCardAccountBalanceRefresh(userInfoId);
		this.repaymentService.checkRepaymentDateUpdate(userInfoId);
	}
	
}
