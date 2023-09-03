package com.example.backend.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.sql.Date;

@Entity
@Data
@NoArgsConstructor
@Table(name = "addresses")
public class Address {
    @GeneratedValue
    @Id
    private Long address_id;
    @Column(unique = true)
    private Long user_info_id;
    private String permanent_resident;
    private String address_street;
    private String address_city;
    private String address_state;
    private Integer address_zip;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date date_moved_in;

    public Address(Long user_info_id, String permanent_resident, String address_street, String address_city, String address_state, Integer address_zip, Date date_moved_in) {
        
    	this.user_info_id = user_info_id;
    	this.permanent_resident = permanent_resident;
    	this.address_street = address_street;
        this.address_city = address_city;
        this.address_state = address_state;
        this.address_zip = address_zip;
        this.date_moved_in = date_moved_in;
    }

}
