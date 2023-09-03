package com.example.backend;

import java.sql.Date;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Service;

import com.example.backend.models.CardAccount;
import com.example.backend.models.Transaction;
import com.example.backend.models.UserInfo;
import com.example.backend.service.UserInfoService;
import com.example.backend.services.CardAccountService;
import com.example.backend.services.TransactionService;

import jakarta.transaction.Transactional;

@Service
public class DataLoader implements ApplicationRunner {

	private UserInfoService userInfoService;
	private CardAccountService cardAccountService;
	private TransactionService transactionService;

	@Autowired
	public DataLoader(UserInfoService userInfoService, CardAccountService cardAccountService, TransactionService transactionService) {
		this.userInfoService = userInfoService;
		this.cardAccountService = cardAccountService;
		this.transactionService = transactionService;

	}

	@Override
	@Transactional
	public void run(ApplicationArguments args) throws Exception {
		// Use SQL dumps rather than loading on each time java runs
		// spring.jpa.hibernate.ddl-auto is set to NONE
		//loadMockData();
	}

	public void loadMockData() {
				
		int year = 2000;
		int month = 03;
		Long transaction_id = (long) 1;
		
		Calendar cal = Calendar.getInstance();
		
		cal.set(Calendar.YEAR, year);
		cal.set(Calendar.MONTH, month - 1); // <-- months start
		
		List<UserInfo> users = new ArrayList<>();
		
		for (int i = 1; i <= 10; i++) {
			
			int day = i;
			cal.set(Calendar.DAY_OF_MONTH, day);
			
			UserInfo user = new UserInfo(null, "First" + i ,"Last" + i , new Date(cal.getTimeInMillis()) , "0412345678", "user" + i + "@email.com", "password" + i, "ROLE_USER", false, "no");
			
			userInfoService.addUser(user);
			
			CardAccount card = new CardAccount(100000.00, user.getUserFirstname());
			card.setUser_info_id((long) i);
			cardAccountService.createCardAccount(card);
			
			for (int j = 1; j <= 3; j++) {
				Transaction transaction = new Transaction(transaction_id, "0" + j + "-03-" + "2023 " + j + ":" + j+j, null, "Merchant" + j, "1000", "4000");
				transaction.setUserInfoId((long) i);
				transactionService.createTransaction(transaction);
				transaction_id = transaction_id + 1;
				card.setCard_account_balance(card.getCard_account_balance() - Integer.parseInt(transaction.getAmount()));
			}
			
			users.add(user);
			transaction_id = transaction_id + 1;
		}
		
		
			
		
		
	}

}
