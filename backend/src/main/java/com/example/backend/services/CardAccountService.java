package com.example.backend.services;

import com.example.backend.DTOs.RepaymentInfoDto;
import com.example.backend.exceptions.NotFoundException;
import com.example.backend.models.CardAccount;
import com.example.backend.models.Transaction;
import com.example.backend.repository.CardAccountRepository;

import java.sql.Date;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.Period;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class CardAccountService {
	@Autowired
	private CardAccountRepository cardAccountRepository;
	
	@Autowired
	private TransactionService transactionService;

	public CardAccount createCardAccount(CardAccount cardAccount) {

		return cardAccountRepository.save(cardAccount);

	}

	public String areDetailsCorrect(String card_account_number) {

		CardAccount cardObject = cardAccountRepository.findByAccNo(card_account_number);

		if (cardObject.getFull_name().length() > 1) {
			return "valid";
		} else {
			return "invalid";
		}

	}

	public void updateCard(String amount, String card_account_number) {

		cardAccountRepository.updateCard(amount, card_account_number);

	}

	public CardAccount updateCard(CardAccount cardAccount) {
		return cardAccountRepository.save(cardAccount);
	}

	public String getBalanceAfterTransaction(String cardNumber) {

		return cardAccountRepository.findByCardAccNo(cardNumber);

	}

	public Double getBalance(Long id) {
		return cardAccountRepository.getBalance(id);
	}

	public CardAccount getCardAccountByUserId(long userInfoId) {
		return this.cardAccountRepository.getCardByUserId(userInfoId).orElse(null);
	}
	
	public void save(CardAccount cardAccount) {
		this.cardAccountRepository.save(cardAccount);
	}
	
	public void checkCardAccountBalanceRefresh(Long userId) {
		CardAccount cardAccount = this.getCardAccountByUserId(userId);
		
		// if null, or already max bal
		if(cardAccount == null || cardAccount.getCard_account_balance() == cardAccount.getCard_account_max_balance()) {
			return;
		}
		
		LocalDate currentDate = LocalDate.now();
		LocalDate firstOfMonth = currentDate.with(TemporalAdjusters.firstDayOfMonth());
		
		List<Transaction> transactions = this.transactionService.getAllTransactionsBetweenAndIncludingDatesByUserId(firstOfMonth, currentDate, userId);
		
		// If transactions are made this month dont reset 
		if(transactions.size() != 0) {
			return;
		}
		
		cardAccount.setCard_account_balance(cardAccount.getCard_account_max_balance());
		
		this.cardAccountRepository.save(cardAccount);
	}
}
