package com.example.backend.DTOs;

import java.util.List;

import com.example.backend.models.Repayment;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CardPaymentPeriodDTO {
	// Date is a string formated for the front end 
	private String date;
	private double totalAmount;
	private double overDueAmount;
	private double paiedAmount;
	// Status should be an enum but other devs didn't like enums 
	private String status;
	private List<Repayment> repayments;
}
