package com.example.backend.services;

import com.example.backend.models.Transaction;
import com.example.backend.repository.TransactionRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TransactionService {

	@Autowired
	private TransactionRepository transactionRepository;

	Logger logger = LoggerFactory.getLogger(TransactionService.class);

	/**
	 * Both create and save are different methods logic custom logic wants to be
	 * added to when first creating a transactions like checking if the id already
	 * exists or formating the date. Not sure why its currently done in the
	 * controller.
	 * 
	 * @param transaction the transaction to create
	 */
	public void createTransaction(Transaction transaction) {
		logger.trace(String.format("Creating transaction: %s", transaction));
		transactionRepository.save(transaction);
	}

	/**
	 * @param id user id
	 * @return A list of transactions made by the user id
	 */
	public List<Transaction> getAllTransactions(Long id) {
		logger.trace(String.format("Getting all transactions for userId : %d", id));
		return transactionRepository.findByUserInfoId(id);

	}

	/**
	 * Gets all transactions between two dates This should be done in the repository
	 * if date was saved as a date/time object. But head dev doesn't like how SQL
	 * handles dates so have to search by string splicing. Causes errors if date
	 * format in DB is changed. I pity anyone who has to deal with this
	 * 
	 * @param startDate    The start date to search for it includes transactions
	 *                     made of this date
	 * @param endDate      The end date to search for it includes transactions made
	 *                     of this date
	 * @param transactions The list of transactions to search for
	 * @return A reduced list of transaction parsed to this method that occur
	 *         between those dates
	 */
	public List<Transaction> getAllTransactionsBetweenAndIncludingDates(LocalDate startDate, LocalDate endDate,
			List<Transaction> transactions) {
		logger.trace(
				"getAllTransactionsBetweenAndIncludingDates called with transactions size: " + transactions.size());

		// Split start/end dates into each value
		int startDay = startDate.getDayOfMonth();
		int startMonth = startDate.getMonthValue();
		int startYear = startDate.getYear();

		int endDay = endDate.getDayOfMonth();
		int endMonth = endDate.getMonthValue();
		int endYear = endDate.getYear();

		logger.debug(String.format("Dates between (YYYY-MM-DD) %d-%d-%d to %d-%d-%d", startYear, startMonth, startDay,
				endYear, endMonth, endDay));
		logger.debug(String.format("TRANSACTION SIZE START: %d", transactions.size()));

		// Filter to be transaction within date
		List<Transaction> returnList = transactions.stream().filter(t -> {
			// Split the string into date / time
			String[] dateSplit = t.getTransaction_date().split(" ");

			// Split into DD - MM - YYYY
			dateSplit = dateSplit[0].split("-");

			int day = Integer.parseInt(dateSplit[0]);
			int month = Integer.parseInt(dateSplit[1]);
			int year = Integer.parseInt(dateSplit[2]);

			logger.debug(String.format("Transaction date: %s became (YYYY-MM-DD) %d-%d-%d", t.getTransaction_date(),
					year, month, day));

			boolean withinDay = day >= startDay && day <= endDay;
			boolean withinMonth = month >= startMonth && month <= endMonth;
			boolean withinYear = year >= startYear && year <= endYear;

			logger.debug(String.format("Within day: %s", withinDay));
			logger.debug(String.format("Within month: %s", withinMonth));
			logger.debug(String.format("Within Year: %s", withinYear));

			return withinDay && withinMonth && withinYear;
		}).collect(Collectors.toList());

		logger.debug(String.format("TRANSACTION SIZE END: %d", transactions.size()));

		return returnList;
	}

	/**
	 * Gets all transactions from a userId and calls a method to reduce that list to
	 * only vales between the dates
	 * 
	 * @param startDate  The start date to search for it includes transactions made
	 *                   of this date
	 * @param endDate    The end date to search for it includes transactions made of
	 *                   this date
	 * @param userInfoId The userid to get the transactions for
	 * @return A list of transaction that occur between those dates
	 */
	public List<Transaction> getAllTransactionsBetweenAndIncludingDatesByUserId(LocalDate startDate, LocalDate endDate,
			Long userInfoId) {
		logger.trace("getAllTransactionsBetweenAndIncludingDatesByUserId called with userId: " + userInfoId);

		// Get all transactions by user id
		List<Transaction> transactions = this.getAllTransactions(userInfoId);

		logger.debug(String.format("Got all transactions for userid: %d, transaction count: %d", userInfoId,
				transactions.size()));

		return this.getAllTransactionsBetweenAndIncludingDates(startDate, endDate, transactions);
	}

	/**
	 * Should be called update rather than save. Updates a existing (or saves a new)
	 * transactions. Separate from create incase custom logic wants to be added to
	 * each function
	 * 
	 * @param transaction
	 */
	public void save(Transaction transaction) {
		logger.trace(String.format("Saving transaction: %s", transaction));
		this.transactionRepository.save(transaction);
	}
}
