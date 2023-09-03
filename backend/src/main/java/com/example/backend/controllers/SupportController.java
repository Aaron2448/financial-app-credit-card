package com.example.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.models.Support;
import com.example.backend.services.SupportService;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/support")
public class SupportController {
	private SupportService supportService;
	
	@Autowired
	public SupportController(SupportService supportService) {
		super();
		this.supportService = supportService;
	}
	
	@PostMapping("/submitTicket")
	public int submitTicket(@RequestBody Support supportTicket) {
		return this.supportService.submitTicket(supportTicket);
	}
	
}
