package com.example.backend.controllers;

import com.example.backend.models.Occupation;
import com.example.backend.services.OccupationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
public class OccupationController {

    @Autowired
    private OccupationService occupationService;

    @PostMapping
    public void createNewOccupation(@RequestBody Occupation occupation) {
        
    	occupationService.createOccupation(occupation);
    	
    }
    
}
