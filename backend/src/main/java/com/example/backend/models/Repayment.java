package com.example.backend.models;

import java.sql.Date;
import java.sql.Time;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

/**
 * Repayment model is for repayments made to the card debt 
 * Currently it piggy backs off the make transaction end point 
 * @author devon.reece
 *
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "repayment")
@ToString
public class Repayment {
	@GeneratedValue
	@Id
	@Column(name = "repayment_id")
	private Long repaymentId;
	
	
	/**
	 * Use date and time to record both in db.
	 * Not sure why other models use formatted strings 
	 */
	@Column(name = "transaction_date")
	@Temporal(TemporalType.DATE)
	private Date transactionDate;
	
	@Column(name = "transaction_time")
	@Temporal(TemporalType.TIME)
	private Time transactionTime;

	private double amount;
	
	@Temporal(TemporalType.DATE)
	@Column(name = "pay_period")
	private Date payPeriod;
	
	@Column(name = "user_info_id")
	private long userInfoId;
}
