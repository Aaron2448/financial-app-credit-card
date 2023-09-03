package com.example.backend.controllers;

import com.example.backend.DTOs.PayerDTO;
import com.example.backend.DTOs.RepaymentInfoDto;
import com.example.backend.models.CardAccount;
import com.example.backend.models.UserInfo;
import com.example.backend.repository.UserInfoRepository;
import com.example.backend.services.CardAccountService;
import com.example.backend.services.RepaymentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/cardAccount")
public class CardAccountController {

	@Autowired
	CardAccountService cardAccountService;

	@Autowired
	TransactionController transactionController;
	
	@Autowired
	private UserInfoRepository userInfoRepo;
	
	RepaymentService repaymentService;

	@PostMapping("/create")
	public CardAccount createNewCard(@RequestBody CardAccount cardAccount) {

		System.out.println("these are the card details: " + cardAccount);

		try {

			return cardAccountService.createCardAccount(cardAccount);

		} catch (Exception e) {

			return null;

		}

	}

	@PostMapping("/submitTransaction")
	public String submitTransaction(@RequestBody PayerDTO payerDTO, Authentication authentication) {
		System.out.println("submit transaction");
		String res = cardAccountService.areDetailsCorrect(payerDTO.getCard_account_number());

		System.out.println("IT GOT TO THE BACKEND HERE");

		if (res.equals("valid")) {

			// Check if paying Howzat
			if (payerDTO.getPayee().trim().toUpperCase().equals("HOWZAT")) {
				this.repaymentService.makeRepayment(authentication.getName(), Double.parseDouble(payerDTO.getAmount()));
				
			} else {
				cardAccountService.updateCard(payerDTO.getAmount(), payerDTO.getCard_account_number());
				String bal = cardAccountService.getBalanceAfterTransaction(payerDTO.getCard_account_number());
				transactionController.createTransactionFromCardAccountController(payerDTO.getAmount(),
						payerDTO.getPayee(), payerDTO.getUser_info_id(), bal);
			}
			return res;

		} else {

			return "error";

		}

	}

	@PostMapping("/getBalance")
	public Double getMyBalance(@RequestBody Long userInfoId) {
		return cardAccountService.getBalance(userInfoId);
	}
    
    @GetMapping("/getCardAccount")
    public CardAccount getCardAccountByUserInfoId() {
    	Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    	String currentUserName = authentication.getName();
    	UserInfo currentUserDto = userInfoRepo.findByEmail(currentUserName).orElse(null);
    	return this.cardAccountService.getCardAccountByUserId(currentUserDto.getId());
    }
}
