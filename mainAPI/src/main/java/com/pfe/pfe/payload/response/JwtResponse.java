package com.pfe.pfe.payload.response;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

public class JwtResponse {

	private String token;
	private String type = "Bearer";
	private Long id;
	private String username;
	private String nom;
	private String prenom;
	private Date dateNaissance;
	private long tel;
	private String email;
	private List<String> roles;




	public JwtResponse(String accessToken,long id ,String username, String nom, String prenom, Date dateNaissance,
			long tel,
			String email, List<String> roles) {

		this.token = accessToken;
		this.id = id;
		this.username = username;
		this.nom = nom;
		this.prenom = prenom;
		this.dateNaissance = dateNaissance;
		this.tel = tel;
		this.email = email;
		this.roles = roles;
	}



	public String getAccessToken() {
		return token;
	}

	public void setAccessToken(String accessToken) {
		this.token = accessToken;
	}

	public String getTokenType() {
		return type;
	}

	public void setTokenType(String tokenType) {
		this.type = tokenType;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public List<String> getRoles() {
		return roles;
	}


	public String getNom() {
		return nom;
	}


	public String getPrenom() {
		return prenom;
	}


	public Date getDateNaissance() {
		return dateNaissance;
	}


	public long getTel() {
		return tel;
	}





	public void setNom(String nom) {
		this.nom = nom;
	}


	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}


	public void setDateNaissance(Date dateNaissance) {
		this.dateNaissance = dateNaissance;
	}


	public void setTel(long tel) {
		this.tel = tel;
	}



}
