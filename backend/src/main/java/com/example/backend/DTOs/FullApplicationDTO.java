package com.example.backend.DTOs;

import com.example.backend.models.Address;
import com.example.backend.models.Asset;
import com.example.backend.models.Expense;
import com.example.backend.models.Finance;
import com.example.backend.models.Occupation;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class FullApplicationDTO {

	Address address;
	Occupation occupation;
	Finance finance;
	Expense expense;
	Asset asset;
	String full_name;
	long user_info_id;
	
}
