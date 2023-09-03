package com.example.backend.services;

import com.example.backend.models.Asset;
import com.example.backend.repository.AssetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AssetService {
    
	@Autowired
    private AssetRepository assetRepository;

    public void createAsset(Asset asset) {
        
    	assetRepository.save(asset);
                
    }
    
}

