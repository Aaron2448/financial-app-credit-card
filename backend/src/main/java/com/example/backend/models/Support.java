package com.example.backend.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@Data
@NoArgsConstructor
@Table(name = "support")
public class Support {
	@GeneratedValue
	@Id
	@Column(name = "support_ticket_id")
	private int id;
	private String name;
	private String email;
	private String description;
	
	private int user_id;

	public Support(int id, String name, String email, String description, int user_id) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.description = description;
		this.user_id = user_id;
	}
	
	
}
