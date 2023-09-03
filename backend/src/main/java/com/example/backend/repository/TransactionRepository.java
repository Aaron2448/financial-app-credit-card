package com.example.backend.repository;

import com.example.backend.models.Transaction;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

	@Query(nativeQuery = true, value = "SELECT * FROM transactions WHERE user_info_id = ?1")
	List<Transaction> findByUserInfoId(Long userInfoId);

}
