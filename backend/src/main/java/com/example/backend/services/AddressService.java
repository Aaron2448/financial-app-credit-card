package com.example.backend.services;

import com.example.backend.models.Address;
import com.example.backend.repository.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AddressService {
    
	@Autowired
    private AddressRepository addressRepository;

    public void createNewAddress(Address address) {

        addressRepository.save(address);
                
    }
    
}
