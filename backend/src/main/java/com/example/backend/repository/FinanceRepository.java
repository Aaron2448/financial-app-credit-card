package com.example.backend.repository;

import com.example.backend.models.Finance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface FinanceRepository extends JpaRepository<Finance, Long> {

	@Query(nativeQuery = true, value = "SELECT * FROM finances WHERE user_info_id = ?1")
	Finance findByUserInfoId(Long userInfoId);

}
