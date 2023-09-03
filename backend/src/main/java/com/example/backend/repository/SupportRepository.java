package com.example.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.backend.models.Support;

@Repository
public interface SupportRepository extends JpaRepository<Support, Integer>{
	
	@Query(nativeQuery = true, value = "SELECT COUNT(*) FROM support")
	int getNumberOfEntries();
}
