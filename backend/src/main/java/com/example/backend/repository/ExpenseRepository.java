package com.example.backend.repository;

import com.example.backend.models.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

	@Query(nativeQuery = true, value = "SELECT * FROM expenses WHERE user_info_id = ?1")
	Expense findByUserInfoId(Long userInfoId);

}
