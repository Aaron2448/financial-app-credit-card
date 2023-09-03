package com.example.backend.controllers;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.DTOs.CardPaymentPeriodDTO;
import com.example.backend.DTOs.RepaymentInfoDto;
import com.example.backend.services.RepaymentService;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/repayment")
public class RepaymentController {
	@Autowired
	private RepaymentService repaymentService;
	
	Logger logger = LoggerFactory.getLogger(RepaymentController.class);
	
	/**
	 * @param authentication
	 * @return The first unpaid amount as determined by your card account payment due date 
	 * Not the total owed if future due dates have been missed
	 */
	@GetMapping()
	public RepaymentInfoDto getYourRepaymentInfo(Authentication authentication) {
		logger.trace("ENDPOINT: getRepaymentInfo Called");
		return this.repaymentService.getLastRepaymentInfo(authentication.getName());
	}
	
	/**
	 * @param authentication
	 * @return Returns a list of repayments dates with totals, types and payments made towards each one
	 */
	@GetMapping("/all")
	public List<CardPaymentPeriodDTO> getYourCardPaymentInfo(Authentication authentication){
		logger.trace("ENDPOINT: getYourCardPaymentInfo Called");
		return this.repaymentService.getAllCardPaymentInfo(authentication.getName());
	}
	
}
