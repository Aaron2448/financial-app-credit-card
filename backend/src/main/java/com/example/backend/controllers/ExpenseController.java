package com.example.backend.controllers;

import com.example.backend.models.Expense;
import com.example.backend.services.ExpenseService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;

    public void createNewExpense(Expense expense){
        
    	expenseService.createExpense(expense);
    	
    }
    
}
