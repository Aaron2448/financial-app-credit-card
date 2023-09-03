package com.example.backend.controllers;

import com.example.backend.models.Transaction;
import com.example.backend.models.UserInfo;
import com.example.backend.repository.UserInfoRepository;
import com.example.backend.services.TransactionService;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/transaction")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;
    
    @Autowired
	private UserInfoRepository userInfoRepo;

    @PostMapping("/create")
    public void createNewTransaction(@RequestBody Transaction transaction){
        
    	transactionService.createTransaction(transaction);
    	
    }
    
    @PostMapping("/getAll")
    public List<Transaction> getAll(@RequestBody Long user_info_id) {
    	
    	return transactionService.getAllTransactions(user_info_id);
    	
    }
    
    public void createTransactionFromCardAccountController(String amt, String merchant_name, long uid, String bal){
        
    	Transaction transaction = new Transaction();
    	transaction.setAmount(amt);
    	transaction.setMerchant_name(merchant_name);
    	transaction.setUserInfoId(uid);
    	transaction.setBalance(bal);
    	LocalDateTime dateObj = LocalDateTime.now();
    	DateTimeFormatter myFormatObj = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
    	String formattedDate = dateObj.format(myFormatObj);
    	transaction.setTransaction_date(formattedDate);
    	System.out.println("THIS IS THE DATE IN STRING FORMAT " + formattedDate);
    	
    	transactionService.createTransaction(transaction);
    	
    }
    
    @GetMapping("/getAllUserTransactions")
    public List<Transaction> getAllTransactionsByUserInfoId(){
    	Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    	String currentUserName = authentication.getName();
    	UserInfo currentUserDto = userInfoRepo.findByEmail(currentUserName).orElse(null);
    	
    	List<Transaction> transactions = this.transactionService.getAllTransactions(currentUserDto.getId());
    	
    	for (Transaction transaction : transactions) {
    		
    		String[] temp = transaction.getTransaction_date().split(" ")[0].split("-");
			
    		LocalDate date = LocalDate.parse(temp[2] + "-" + temp[1] + "-" + temp[0]);
    		
    		String dateStr = date.getDayOfMonth() + " " + date.getMonth().toString().substring(0,3) + " " + date.getYear();
    		
    		transaction.setTransaction_date(dateStr);
		}
    	
    	return transactions;
    }
    
}
