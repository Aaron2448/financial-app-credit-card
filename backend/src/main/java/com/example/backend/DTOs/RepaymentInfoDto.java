package com.example.backend.DTOs;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RepaymentInfoDto {
	// Date is a string formated for the front end 
	private String dueDate;
	private String owedName = "Howzat";
	private double amount;
	private boolean isOverDue;

	public RepaymentInfoDto(String dueDate, double amount, boolean isOverDue) {
		super();
		this.dueDate = dueDate;
		this.amount = amount;
		this.isOverDue = isOverDue;
	}

}
