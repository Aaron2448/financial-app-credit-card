package com.example.backend.repository;

import com.example.backend.models.Occupation;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OccupationRepository extends JpaRepository<Occupation, Long> {

}
