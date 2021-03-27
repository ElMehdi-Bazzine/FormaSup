package com.pfe.pfe.payload.request;

import javax.validation.constraints.*;
import java.sql.Date;
import java.time.LocalDate;
import java.util.Set;

public class SignupRequest {
    @NotBlank
    @Size(min = 3, max = 20)
    private String username;
 
   
    @NotBlank
    @Size(min = 2, max = 20)
    private String nom;
    @NotBlank
    @Size(min = 2, max = 20)
	private String prenom;
    
	private Date dateNaissance;
   
	private long tel; 
	
	@NotBlank
    @Size(max = 50)
    @Email
    private String email;
	private Set<String> role;
    
    @NotBlank
    @Size(min = 6, max = 40)
    private String password;
   public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}

	public String getPrenom() {
		return prenom;
	}

	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}

	public Date getDateNaissance() {
		return dateNaissance;
	}

	public void setDateNaissance(Date dateNaissance) {
		this.dateNaissance = dateNaissance;
	}

	public long getTel() {
		return tel;
	}

	public void setTel(long tel) {
		this.tel = tel;
	}


    public String getUsername() {
        return username;
    }
 
    public void setUsername(String username) {
        this.username = username;
    }
 
    public String getEmail() {
        return email;
    }
 
    public void setEmail(String email) {
        this.email = email;
    }
 
    public String getPassword() {
        return password;
    }
 
    public void setPassword(String password) {
        this.password = password;
    }
    
    public Set<String> getRole() {
      return this.role;
    }
    
    public void setRole(Set<String> role) {
      this.role = role;
    }
}
