package com.example.backend.controllers;

import com.example.backend.models.Asset;
import com.example.backend.services.AssetService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
public class AssetController {

    @Autowired
    private AssetService assetService;

    public void createNewAsset(Asset asset){
        
    	assetService.createAsset(asset);
    	
    }
    
}
