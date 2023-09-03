package com.example.backend.DTOs;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class forgotPasswordDTO {
	
	String amount;
	String payee;
	String full_name;
	String card_account_number; 
	String card_account_expiration_date;
	String card_account_CVV;
	Long user_info_id;

}
