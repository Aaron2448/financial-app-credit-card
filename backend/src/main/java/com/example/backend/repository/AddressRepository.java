package com.example.backend.repository;

import com.example.backend.models.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AddressRepository extends JpaRepository<Address, Long> {

	@Query(nativeQuery = true, value = "SELECT * FROM addresses WHERE user_info_id = ?1")
	Address findByUserInfoId(Long userInfoId);

}
