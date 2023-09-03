package com.example.backend.models;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.sql.Date;
import java.sql.Time;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.TemporalAdjuster;
import java.time.temporal.TemporalAdjusters;
import java.util.Random;

import org.hibernate.type.descriptor.DateTimeUtils;

@Entity
@Data
@NoArgsConstructor
@Table(name = "card_accounts")
public class CardAccount {
	@GeneratedValue
	@Id
	private Long card_account_id;
	private Long user_info_id;
	private String full_name;
	private String card_account_number;
	private Double card_account_balance;
	private Double card_account_max_balance;
	private Date card_account_expiration_date;
	private Date card_next_payment_due_date;
	private String card_account_CVV;

	public CardAccount(Double cardAccountMaxBalance, String fullName) {
		this.card_account_number = generateCardNumber();
		this.card_account_CVV = generateCVV();
		this.card_account_expiration_date = generateExpiryDate();
		this.card_next_payment_due_date = this.getNextPaymentDate();
		this.card_account_max_balance = cardAccountMaxBalance;
		this.card_account_balance = cardAccountMaxBalance;
		this.full_name = fullName;
	}

	public void addFunds(Double amount) {
		this.card_account_balance += amount;
	}

	public void minusFunds(Double amount) {
		this.card_account_balance -= amount;
	}

	public Date getNextPaymentDate() {
		// Returns last day of current month
		LocalDate lastDayOfMonth = LocalDate.now().with(TemporalAdjusters.lastDayOfMonth());

		return Date.valueOf(lastDayOfMonth);
	}

	private String generateCardNumber() {
		Random random = new Random();
		StringBuilder cardNumber = new StringBuilder("4223");
		for (int i = 0; i < 3; i++) {
			cardNumber.append(random.nextInt(9999 - 1000) + 1000);
		}
		return cardNumber.toString();
	}

	private String generateCVV() {
		Random random = new Random();
		return String.valueOf(random.nextInt(999 - 100) + 100);
	}

	private Date generateExpiryDate() {
		return new Date(System.currentTimeMillis() + 126227704000L);
	}
}
