package com.example.backend.repository;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.models.Repayment;

public interface RepaymentRepository extends JpaRepository<Repayment, Long>{

	public List<Repayment> findAllByUserInfoIdAndPayPeriod(Long userInfoId, Date payPeriod);
	public List<Repayment> findAllByUserInfoId(long userInfoId);
}
