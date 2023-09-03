package com.example.backend.repository;

import com.example.backend.models.CardAccount;
import jakarta.transaction.Transactional;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;

@Transactional
public interface CardAccountRepository extends JpaRepository<CardAccount, Long> {

	@Query(nativeQuery = true, value = "SELECT * FROM card_accounts WHERE card_account_number = ?1")
	CardAccount findByAccNo(String CCNumber);

	@Modifying
	@Query(nativeQuery = true, value = "UPDATE card_accounts c SET c.card_account_balance = c.card_account_balance - :amount WHERE c.card_account_number = :card_account_number")
	void updateCard(@Param("amount") String amount, @Param("card_account_number") String card_account_number);

	@Query(nativeQuery = true, value = "SELECT card_account_balance FROM card_accounts WHERE card_account_number = ?1")
	String findByCardAccNo(String CCNumber);

	@Query(nativeQuery = true, value = "SELECT card_account_balance FROM card_accounts WHERE user_info_id= ?1")
	Double getBalance(Long id);
	
	@Query(nativeQuery = true, value = "SELECT * FROM card_accounts WHERE user_info_id = ?1")
	Optional<CardAccount> getCardByUserId(Long id);
}
