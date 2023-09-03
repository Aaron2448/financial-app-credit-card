package com.example.backend.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "assets")
public class Asset {

	@GeneratedValue
    @Id
	Long asset_id;
	
	@Column(unique = true) 
	Long user_info_id;

	String description;
	double amount;
	String frequency;
	
}

