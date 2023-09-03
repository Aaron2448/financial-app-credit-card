package com.example.backend.controllers;

import com.example.backend.models.Address;
import com.example.backend.models.Finance;
import com.example.backend.services.AddressService;
import com.example.backend.services.FinanceService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
public class FinanceController {

    @Autowired
    private FinanceService financeService;

    public void createNewFinance(Finance finance){
        
    	financeService.createFinance(finance);
    	
    }
    
}

