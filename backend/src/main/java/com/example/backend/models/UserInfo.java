package com.example.backend.models;

import java.sql.Date;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String userFirstname;
    
    @Column(nullable = false)
    private String userLastname;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date userDob;
    
    @Column(nullable = false)
    private String userMobilePhoneNo;
    
    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    private String roles = "ROLE_USER";
    
    private boolean use2FA;
    
    private String resetRecently = "no";

    public Object map(Object object) {
        // TODO Auto-generated method stub
        return null;
    }
   
}
