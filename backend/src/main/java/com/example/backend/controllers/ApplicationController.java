package com.example.backend.controllers;

import com.example.backend.DTOs.FullApplicationDTO;
import com.example.backend.models.Address;
import com.example.backend.models.Asset;
import com.example.backend.models.CardAccount;
import com.example.backend.models.Expense;
import com.example.backend.models.Finance;
import com.example.backend.models.Occupation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/application")
public class ApplicationController {
    
	@Autowired
    private AddressController addressController;

    @Autowired
    private OccupationController occupationController;
    
    @Autowired
    private FinanceController financeController;
    
    @Autowired
    private AssetController assetController;
    
    @Autowired
    private ExpenseController expenseController;

	@Autowired
	private	CardAccountController cardAccountController;
    
    @PostMapping("/create")
    public String createNewApplication(@RequestBody FullApplicationDTO fullAppDTO){
        
    	System.out.println("this is the DTO: " + fullAppDTO);
    	Address address = fullAppDTO.getAddress();
		Occupation occupation = fullAppDTO.getOccupation();
		Finance finance = fullAppDTO.getFinance();
		Expense expense = fullAppDTO.getExpense();
		Asset asset = fullAppDTO.getAsset();
		String full_name = fullAppDTO.getFull_name();
		double creditScorePercentage = (expense.getAmount() / finance.getAmount()) * 100;
		double cardAccountMaxBalance;
	
			if (creditScorePercentage > 80.00) {
				return "failed";
			} else if (creditScorePercentage >= 60.00) {
				cardAccountMaxBalance = 5000;
			} else if (creditScorePercentage >= 50.00) {
				cardAccountMaxBalance = 10000;
			} else if (creditScorePercentage >= 35.00) {
				cardAccountMaxBalance = 15000;
			} else {
				cardAccountMaxBalance = 25000;
			};
		
		try {
					
				if (creditScorePercentage <= 80) {

					addressController.createNewAddress(address);
					occupationController.createNewOccupation(occupation);
					financeController.createNewFinance(finance);
					expenseController.createNewExpense(expense);
					assetController.createNewAsset(asset);
					
					CardAccount cardAccount = new CardAccount(cardAccountMaxBalance, full_name);
					cardAccount.setUser_info_id(finance.getUser_info_id());
					cardAccountController.createNewCard(cardAccount);
	
					return "added";
				
				} else {
					
					return "failed";
					
				}
			
				
		} catch (Exception e) {
    		
			return "failed";
    		
		}
    	
    }
    
    
}
