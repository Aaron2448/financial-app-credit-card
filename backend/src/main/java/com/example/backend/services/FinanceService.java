package com.example.backend.services;

import com.example.backend.models.Finance;
import com.example.backend.repository.FinanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FinanceService {
    
	@Autowired
    private FinanceRepository financeRepository;

    public void createFinance(Finance finance) {
        
    	financeRepository.save(finance);
                
    }
    
}
