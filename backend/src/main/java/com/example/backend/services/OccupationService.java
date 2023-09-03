package com.example.backend.services;

import com.example.backend.models.Occupation;
import com.example.backend.repository.OccupationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OccupationService {
    
	@Autowired
    private OccupationRepository occupationRepository;

    public void createOccupation(Occupation occupation) {
        
        occupationRepository.save(occupation);
                
    }
    
}
