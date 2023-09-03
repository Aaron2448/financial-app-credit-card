package com.example.backend.repository;

import com.example.backend.models.Asset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AssetRepository extends JpaRepository<Asset, Long> {

	@Query(nativeQuery = true, value = "SELECT * FROM asset WHERE user_info_id = ?1")
	Asset findByUserInfoId(Long userInfoId);

}
