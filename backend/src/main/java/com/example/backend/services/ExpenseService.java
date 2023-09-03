package com.example.backend.services;

import com.example.backend.models.Expense;
import com.example.backend.repository.ExpenseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ExpenseService {
    
	@Autowired
    private ExpenseRepository expenseRepository;

    public void createExpense(Expense expense) {
        
    	expenseRepository.save(expense);
                
    }
    
}
