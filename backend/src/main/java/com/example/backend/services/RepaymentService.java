package com.example.backend.services;

import java.sql.Date;
import java.sql.Time;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.Period;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAdjuster;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.DTOs.CardPaymentPeriodDTO;
import com.example.backend.DTOs.RepaymentInfoDto;
import com.example.backend.controllers.RepaymentController;
import com.example.backend.models.CardAccount;
import com.example.backend.models.Repayment;
import com.example.backend.models.Transaction;
import com.example.backend.repository.RepaymentRepository;
import com.example.backend.service.UserInfoUserDetailsService;

@Service
public class RepaymentService {
	/**
	 * Days without gaining interest This is from the final day of the period (end
	 * of month)
	 */
	private final int INTEREST_GRACE_PERIOD_DAYS = 44;
	/**
	 * Percent value of interest 0.044%
	 */
	private final double INTEREST_RATE = 0.044;

	Logger logger = LoggerFactory.getLogger(RepaymentService.class);

	@Autowired
	private RepaymentRepository repaymentRepo;

	@Autowired
	private TransactionService transactionService;

	@Autowired
	private CardAccountService cardAccountService;

	@Autowired
	private UserInfoUserDetailsService userDetailsService;

	/**
	 * @param userInfoId User info ID (which is the link for all tables in the DB)
	 * @param payPeriod  The period the payment is made towards. Last day of each
	 *                   month
	 * @return List of all repayments made towards a certain payPeriod
	 */
	public List<Repayment> findAllByUserInfoIdAndPayPeriod(Long userInfoId, Date payPeriod) {
		logger.trace("findAllByUserInfoIdAndPayPeriod Called");
		logger.debug(
				String.format("Finding all repayments made for pay period: %s for userId: %d", payPeriod, userInfoId));

		List<Repayment> repayments = this.repaymentRepo.findAllByUserInfoIdAndPayPeriod(userInfoId, payPeriod);

		logger.debug(String.format("%d repayments found", repayments.size()));

		return repayments;
	}

	/**
	 * @param userInfoId User info ID (which is the link for all tables in the DB)
	 * @param payPeriod  The period the payment is made towards. Last day of each
	 *                   month
	 * @return List of all repayments made towards a certain payPeriod
	 */
	public List<Repayment> findAllByUserInfoIdAndPayPeriod(Long userInfoId, LocalDate payPeriod) {
		logger.trace("findAllByUserInfoIdAndPayPeriod Called with localdate, converting");
		return this.repaymentRepo.findAllByUserInfoIdAndPayPeriod(userInfoId, Date.valueOf(payPeriod));
	}

	/**
	 * @param email Email (another unique key in the user table)
	 * @return RepaymentInfoDto for last payment due If no card account will return
	 *         an empty RepaymentInfoDto with '-' as a date
	 */
	public RepaymentInfoDto getLastRepaymentInfo(String email) {
		logger.trace("getLastRepaymentInfo Called");
		// Gets logged in user info
		Long userInfoId = this.userDetailsService.getUserIdByEmail(email);

		CardAccount account = this.cardAccountService.getCardAccountByUserId(userInfoId);

		logger.debug(String.format("Account found: %s", account));

		return this.getRepaymentInfoDtoFromAccountAndId(account, userInfoId);

	}

	/**
	 * Make repayments currently repays the most recent unpaid period (determined by
	 * card account) It will then move the the pay period to the next month if that
	 * period has passed. The system is not set up so you can pay more than you owe.
	 * Will just set the amount to the owed amount if attempting to over pay. Could
	 * Reactor it to throw a bad request
	 * 
	 * @param email  Email for the user. Used to get the user id which ties the db
	 *               together
	 * @param amount The amount being repaied
	 */
	public void makeRepayment(String email, Double amount) {
		// Gets logged in user info
		Long userInfoId = this.userDetailsService.getUserIdByEmail(email);

		CardAccount account = this.cardAccountService.getCardAccountByUserId(userInfoId);

		logger.debug(String.format("Account found: %s", account));

		// Get last repayments info
		RepaymentInfoDto repaymentInfo = this.getRepaymentInfoDtoFromAccountAndId(account, userInfoId);

		// Can't pay if no money owed
		if (repaymentInfo.getAmount() <= 0) {
			return;
		}
		// Can't pay more than is currently owed
		if (amount > repaymentInfo.getAmount()) {
			amount = repaymentInfo.getAmount();
		}

		// Create Repayment
		Repayment repayment = new Repayment();
		repayment.setTransactionDate(Date.valueOf(LocalDate.now()));
		repayment.setTransactionTime(Time.valueOf(LocalTime.now()));
		repayment.setAmount(amount);
		repayment.setPayPeriod(account.getCard_next_payment_due_date());
		repayment.setUserInfoId(userInfoId);

		logger.debug(String.format("Created a Repayment: %s", repayment));

		// Save
		this.repaymentRepo.save(repayment);

		// Check if repayments date has passed
		LocalDate paymentDue = account.getCard_next_payment_due_date().toLocalDate();
		LocalDate currentDate = LocalDate.now();

		if (!currentDate.isAfter(paymentDue)) {
			logger.debug(
					String.format("Not time to update date. PaymentDue: %s, currentDate: %s", paymentDue, currentDate));
			// Not time to update payment date
			return;
		}

		// Update payment due date
		// Adding 5 to go to the next month, could get away with 1. But for possible
		// edge cases
		LocalDate updatedDate = currentDate.plusDays(5).with(TemporalAdjusters.lastDayOfMonth());
		account.setCard_next_payment_due_date(Date.valueOf(updatedDate));

		logger.debug(String.format("Updated due date to new value: %s", updatedDate));

		// Save card account
		this.cardAccountService.save(account);
	}

	/**
	 * This method gets the user repayments info for most recent unpaid period
	 * (determined by card account)
	 * 
	 * @param account    Card account tied to the user id
	 * @param userInfoId TODO remove this pram. Its tied to the card account so both
	 *                   are not required.
	 * @return RepaymentInfoDto formated for fount end
	 */
	private RepaymentInfoDto getRepaymentInfoDtoFromAccountAndId(CardAccount account, Long userInfoId) {
		// if null no due date or money owned
		if (account == null) {
			return new RepaymentInfoDto("-", 0, false);
		}

		// Get current date and one month before last payment
		LocalDate paymentDue = account.getCard_next_payment_due_date().toLocalDate();
		LocalDate firstOfMonth = paymentDue.with(TemporalAdjusters.firstDayOfMonth());
		LocalDate currentDate = LocalDate.now();

		// Get all transactions made between first and last day of month
		List<Transaction> transactionsBetween = this.transactionService
				.getAllTransactionsBetweenAndIncludingDatesByUserId(firstOfMonth, paymentDue, userInfoId);

		// Work out how much is owed
		Double totalOwed = transactionsBetween.stream().mapToDouble(t -> Double.parseDouble(t.getAmount())).sum();

		logger.debug(String.format("Total owed (beofre interest): %f", totalOwed));

		// Check if overdue
		boolean isOverDue = paymentDue.isBefore(currentDate.minusDays(this.INTEREST_GRACE_PERIOD_DAYS));

		if (isOverDue)
			totalOwed = calculateInterest(totalOwed, paymentDue);

		logger.debug(String.format("Total owed (after interest): %f", totalOwed));

		// Find amount already paid
		List<Repayment> repaymentMade = this.findAllByUserInfoIdAndPayPeriod(userInfoId, paymentDue);
		Double amountPaid = repaymentMade.stream().mapToDouble(r -> r.getAmount()).sum();

		totalOwed -= amountPaid;

		logger.debug(String.format("Total owed (after reductions): %f", totalOwed));

		// Date format
		DateFormat dateFormat = new SimpleDateFormat("dd MMMM yyyy");

		return new RepaymentInfoDto(dateFormat.format(Date.valueOf(paymentDue)), totalOwed, isOverDue);
	}

	/**
	 * This method is called when user logs in. It checks if repayments has been
	 * paid for the most recent period as determined by the card account. This could
	 * occur if no transactions were made in a given period or if a user pre-paid an
	 * amount and no more transactions were made since that payment TODO this method
	 * should check future periods for the same edge case. Otherwise user will have
	 * to log out/in again to solve.
	 * 
	 * @param userid User id to check update
	 */
	public void checkRepaymentDateUpdate(Long userid) {
		logger.debug(String.format("Checking if user [ID: %d] repayment due date needs updating", userid));

		CardAccount cardAccount = this.cardAccountService.getCardAccountByUserId(userid);

		if (cardAccount == null) {
			return;
		}

		LocalDate currentDate = LocalDate.now();
		LocalDate cardPayDue = cardAccount.getCard_next_payment_due_date().toLocalDate();

		// If current date is before pay date
		if (currentDate.isBefore(cardPayDue)) {
			logger.debug(String.format("Date %s is before %s", currentDate, cardPayDue));
			return;
		}

		RepaymentInfoDto repaymentInfoDto = this.getRepaymentInfoDtoFromAccountAndId(cardAccount, userid);

		// Only update date without payment if no money is owed
		if (repaymentInfoDto.getAmount() != 0) {
			logger.debug(String.format("Repayment owed is: %f", repaymentInfoDto.getAmount()));
			return;
		}

		cardPayDue = cardPayDue.plusDays(5).with(TemporalAdjusters.lastDayOfMonth());

		cardAccount.setCard_next_payment_due_date(Date.valueOf(cardPayDue));

		logger.debug("Updating payment date");

		this.cardAccountService.save(cardAccount);
	}

	/**
	 * Gets all the card payment info formated for the front end Get's all the
	 * transactions the user made and go though them period by period (each period
	 * is 1 month) Until no transaction remain This means it won't create a
	 * CardPaymentPeriodDTO if no transactions were made during a period so months
	 * can be skipped.
	 * 
	 * @param email Email of the user to get the info for
	 * @return Formatted list of CardPaymentPeriodDTO for the front end, in order of
	 *         payment period (latest is first)
	 */
	public List<CardPaymentPeriodDTO> getAllCardPaymentInfo(String email) {
		List<CardPaymentPeriodDTO> cardPaymentPeriodDTOs = new ArrayList<>();

		// Gets logged in user info
		Long userInfoId = this.userDetailsService.getUserIdByEmail(email);

		CardAccount account = this.cardAccountService.getCardAccountByUserId(userInfoId);

		List<Transaction> transactions = this.transactionService.getAllTransactions(userInfoId);

		if (account == null || transactions.size() == 0) {
			return cardPaymentPeriodDTOs;
		}

		logger.debug(String.format("Transactions found. Size : %d, for userID: %d", transactions.size(), userInfoId));

		LocalDate startPeriod = LocalDate.now().with(TemporalAdjusters.firstDayOfMonth());
		LocalDate lastUnpaiedPeriod = account.getCard_next_payment_due_date().toLocalDate();
		DateTimeFormatter DATEFORMAT = DateTimeFormatter.ofPattern("MMMM y");

		while (transactions.size() != 0) {
			LocalDate endPeriod = startPeriod.with(TemporalAdjusters.lastDayOfMonth());

			Boolean beenPaid = lastUnpaiedPeriod.isAfter(endPeriod);

			// Check if overdue (only matters if not paid)
			boolean isOverDue = endPeriod.isBefore(LocalDate.now().minusDays(this.INTEREST_GRACE_PERIOD_DAYS));

			// Get all transactions
			List<Transaction> transactionsWithinPeriod = this.transactionService
					.getAllTransactionsBetweenAndIncludingDates(startPeriod, endPeriod, transactions);

			// All transactions made to Howzat
			List<Repayment> cardPayments = this.repaymentRepo.findAllByUserInfoIdAndPayPeriod(userInfoId,
					Date.valueOf(endPeriod));

			// Get the totals
			Double sumOwed = transactionsWithinPeriod.stream().mapToDouble(t -> Double.parseDouble(t.getAmount()))
					.sum();
			Double totalPaied = cardPayments.stream().mapToDouble(r -> r.getAmount()).sum();

			// If it has been paid interest would be how much more paid than sum
			// Else calculate interest to today
			Double interest;
			if (beenPaid) {
				interest = totalPaied - sumOwed;
			} else {
				interest = this.calculateInterest(sumOwed, endPeriod);
				interest -= sumOwed;
			}

			Double totalOwed = sumOwed + interest;

			// Add all values to payment period
			CardPaymentPeriodDTO paymentPeriod = new CardPaymentPeriodDTO();
			paymentPeriod.setDate(startPeriod.format(DATEFORMAT));
			paymentPeriod.setTotalAmount(totalOwed);
			paymentPeriod.setOverDueAmount(interest);
			paymentPeriod.setPaiedAmount(totalPaied);
			paymentPeriod.setRepayments(cardPayments);

			// Sets status
			if (beenPaid) {
				paymentPeriod.setStatus("Paid");
			} else if (isOverDue) {
				paymentPeriod.setStatus("Overdue");
			}
			// If date to pay has not passed yet
			else if (lastUnpaiedPeriod.isAfter(endPeriod)) {
				paymentPeriod.setStatus("Due");
			} else {
				paymentPeriod.setStatus("Up comming");
			}

			cardPaymentPeriodDTOs.add(paymentPeriod);

			logger.debug(String.format(
					"-- Pamyent periord from %s - %s: PaymentsMade: %d, totalTransactions: %d, totalOwed: %f",
					startPeriod, endPeriod, cardPayments.size(), transactionsWithinPeriod.size(), totalOwed));

			// Remove values from list
			transactions.removeAll(transactionsWithinPeriod);

			// Set date back a month
			startPeriod = startPeriod.minusDays(1).with(TemporalAdjusters.firstDayOfMonth());
		}

		return cardPaymentPeriodDTOs;
	}

	/**
	 * @param totalOwed The current total owed
	 * @param dueDate   The date payment was due (end of month)
	 * @return Returns the total owed including interest
	 */
	public double calculateInterest(Double totalOwed, LocalDate dueDate) {
		LocalDate currentDate = LocalDate.now();

		// work out how many days it is overdue by
		int daysOverDue = Period.between(dueDate, currentDate).getDays();
		daysOverDue -= this.INTEREST_GRACE_PERIOD_DAYS;

		// Value to times price by each day (compound interest)
		double rateToTimes = (this.INTEREST_RATE / 100) + 1;

		// for each day overdue pass the grace period
		// if value is 0 or negtive will have no effect
		for (int i = 0; i < daysOverDue; i++) {
			totalOwed *= rateToTimes;
		}

		return totalOwed;
	}
}
