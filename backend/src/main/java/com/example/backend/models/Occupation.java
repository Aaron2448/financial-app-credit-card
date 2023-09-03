package com.example.backend.models;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Data
@NoArgsConstructor
@Table(name = "occupations")
public class Occupation {
    
	@GeneratedValue
    @Id
    private Long occupation_id;
	@Column(unique = true)
    private Long user_info_id;
    private String occupation_title;
    private String occupation_type;
    private Double occupation_salary;

    public Occupation(Long user_info_id, String occupation_title, String occupation_type, Double occupation_salary) {
        this.occupation_title = occupation_title;
        this.occupation_type = occupation_type;
        this.occupation_salary = occupation_salary;
    }
}
