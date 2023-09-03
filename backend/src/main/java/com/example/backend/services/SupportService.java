package com.example.backend.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.example.backend.models.Support;
import com.example.backend.repository.SupportRepository;


@Service
public class SupportService {
	private SupportRepository supportRepository;
	private Logger logger = LoggerFactory.getLogger(SupportService.class);

	public SupportService(SupportRepository supportRepository) {
		super();
		this.supportRepository = supportRepository;
	}

	public int submitTicket(Support supportTicket) {
		this.supportRepository.save(supportTicket);
		logger.info("Support ticket submitted: " + supportTicket.getEmail());
		int numberOfSupportTickets = this.supportRepository.getNumberOfEntries();
		
		//business logic to calculate estimated number of days for a response time for customer
		int estimatedResponseTimeDays = Math.round(numberOfSupportTickets/5 + 1);
		logger.info("Estimated Support Ticket Response time: " + estimatedResponseTimeDays);
		return estimatedResponseTimeDays;
	}
	
	
}
