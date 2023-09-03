package com.example.backend.controllers;

import com.example.backend.models.Address;
import com.example.backend.services.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
public class AddressController {

    @Autowired
    private AddressService addressService;

    public void createNewAddress(Address address){
        
    	addressService.createNewAddress(address);
    	
    }
    
}
