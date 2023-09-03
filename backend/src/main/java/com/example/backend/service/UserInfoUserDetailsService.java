package com.example.backend.service;

import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import com.example.backend.config.UserInfoUserDetails;
import com.example.backend.models.UserInfo;
import com.example.backend.repository.UserInfoRepository;

@Component
public class UserInfoUserDetailsService implements UserDetailsService {

	@Autowired
	private UserInfoRepository userInfoRepo;
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		
		Optional<UserInfo> userInfo = userInfoRepo.findByEmail(email);
		
		return userInfo.map(UserInfoUserDetails::new)
			.orElseThrow(()-> new UsernameNotFoundException("UserInfo not found " + email ));
		
	}
	
	public Long getUserIdByEmail(String email) {
		UserInfo user = this.userInfoRepo.findByEmail(email)
				.orElseThrow(()-> new UsernameNotFoundException("UserInfo not found " + email ));
		
		return user.getId();
	}

}
