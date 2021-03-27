package com.pfe.pfe.models;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import javafx.geometry.Pos;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.sql.Date;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name="users", uniqueConstraints=
            @UniqueConstraint(columnNames={"EMAIL"}, name = "uniqueemailConstraint")
    )
@JsonIgnoreProperties
public class User implements Serializable{
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long user_id;
	
	@NotNull
	@Size(min=2,message="le nom doit contenir au moins 2 caractéres ")
    @Column( nullable = false)
	private String nom;
	
	@NotNull
	@Size(min=2,message="le prenom doit contenir au moins 2 caractéres ")
   @Column( nullable = false)
	private String prenom;
	
	 @JsonFormat
     (shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
	private Date dateNaissance;
	
	@Email
	@NotBlank
    @Column( nullable = false,unique = true)
	private String email;
	
	@NotNull
    @Column(name = "username", nullable = false, unique = true)
	private String username;
	
	private String password;
	
	private long tel;

	@OneToMany(targetEntity=Post.class,fetch = FetchType.EAGER,orphanRemoval=true)
	private List<Post> posts;
	
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(	name = "user_roles", 
				joinColumns = @JoinColumn(name = "user_id"), 
				inverseJoinColumns = @JoinColumn(name = "role_id"))
	@JsonIgnore
	private Set<Role> roles = new HashSet<>();
 
	

	
	public User(@NotNull @Size(min = 2, message = "le nom doit contenir au moins 2 caractéres ")String nom,
                @NotNull @Size(min = 2, message = "le prenom doit contenir au moins 2 caractéres ")String prenom,
                Date dateNaissance, @Email @NotBlank String email,
                @NotNull String username, String password, long tel) {
		this.nom = nom;
		this.prenom = prenom;
		this.dateNaissance = dateNaissance;
		this.email = email;
		this.username = username;
		this.password = password;
		this.tel = tel;
	}

	public User() {
	}



	public long getUser_id() {
		return user_id;
	}

	public void setUser_id(long user_id) {
		this.user_id = user_id;
	}

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

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public long getTel() {
		return tel;
	}

	public void setTel(long tel) {
		this.tel = tel;
	}

	

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

	public List<Post> getPosts() {
		return posts;
	}

	public void setPosts(List<Post> posts) {
		this.posts = posts;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o) return true;
		if (o == null || getClass() != o.getClass()) return false;
		User user = (User) o;
		return user_id == user.user_id && tel == user.tel && Objects.equals(nom, user.nom) && Objects.equals(prenom, user.prenom) && Objects.equals(dateNaissance, user.dateNaissance) && Objects.equals(email, user.email) && Objects.equals(username, user.username) && Objects.equals(password, user.password) && Objects.equals(roles, user.roles);
	}

	@Override
	public int hashCode() {
		return Objects.hash(user_id, nom, prenom, dateNaissance, email, username, password, tel, roles);
	}

	@Override
	public String toString() {
		return "User [user_id=" + user_id + ", nom=" + nom + ", prenom=" + prenom + ", dateNaissance=" + dateNaissance
				+ ", email=" + email + ", username=" + username + ", password=" + password + ", tel=" + tel + ", roles=" + roles + "]";
	}

	
	 

	
}
