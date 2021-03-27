package com.pfe.pfe.controllers;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.Valid;

import com.pfe.pfe.models.EnumRole;
import com.pfe.pfe.security.services.UserDetailsServiceImpl;
import com.pfe.pfe.service.PostService;
import org.apache.velocity.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
//import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


import com.pfe.pfe.models.Role;
import com.pfe.pfe.models.User;
import com.pfe.pfe.payload.request.LoginRequest;
import com.pfe.pfe.payload.request.SignupRequest;
import com.pfe.pfe.payload.response.JwtResponse;
import com.pfe.pfe.payload.response.MessageResponse;
import com.pfe.pfe.repository.RoleRepository;
import com.pfe.pfe.repository.UserRepository;
import com.pfe.pfe.security.jwt.JwtUtils;
import com.pfe.pfe.security.services.UserDetailsImpl;


@CrossOrigin(origins="http://localhost:4200")
@RestController
@RequestMapping("/api/auth")
public class AuthController {
	@Autowired
	private UserDetailsServiceImpl userDetailsService;

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserRepository userRepository;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtUtils jwtUtils;


	@GetMapping("/users/{id}")
	public User getUser(@PathVariable Long id){
		Optional<User>  user = userRepository.findById(id);
		return user.get();}


	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);

		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		List<String> roles = userDetails.getAuthorities().stream()
				.map(item -> item.getAuthority())
				.collect(Collectors.toList());

		return ResponseEntity.ok(new JwtResponse(jwt,
				userDetails.getId(),
				userDetails.getUsername(),
				userDetails.getNom(),
				userDetails.getPrenom(),
				userDetails.getDateNaissance(),
				userDetails.getTel(),
				userDetails.getEmail(),

				roles));
	}

	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Username non Valide!"));
		}

		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Email non Valide!"));
		}


		User user = new User(
				signUpRequest.getNom(),
				signUpRequest.getPrenom(),
				signUpRequest.getDateNaissance(),
				signUpRequest.getEmail(),
				signUpRequest.getUsername(),
				encoder.encode(signUpRequest.getPassword()),
				signUpRequest.getTel()

		);

		Set<String> strRoles = signUpRequest.getRole();
		Set<Role> roles = new HashSet<>();

		if (strRoles == null) {
			Role userRole = roleRepository.findByName(EnumRole.ROLE_USER)
					.orElseThrow(() -> new RuntimeException("Error: Pas de Role ."));
			roles.add(userRole);
		} else {
			strRoles.forEach(role -> {
				switch (role) {
					case "admin":
						Role adminRole = roleRepository.findByName(EnumRole.ROLE_ADMIN)
								.orElseThrow(() -> new RuntimeException("Error: Pas de Role."));
						roles.add(adminRole);

						break;

					default:
						Role userRole = roleRepository.findByName(EnumRole.ROLE_USER)
								.orElseThrow(() -> new RuntimeException("Error: Pas de Role."));
						roles.add(userRole);
				}
			});
		}

		user.setRoles(roles);
		userRepository.save(user);

		return ResponseEntity.ok(new MessageResponse("Signup success !!!!!!"));
	}


	@RequestMapping(value="/alluser",method=RequestMethod.GET )
	@PreAuthorize("hasRole('ROLE_ADMIN')")
	public  List<User> getallUsers(){
		return userRepository.findAll();
	}

	@DeleteMapping("/users/{id}")
	public boolean deleteUser(@PathVariable Long id) {
		System.out.println("Controlleeeeeeuuurrrr "+id);
		userDetailsService.delete(id);
		return true;
	}

	@PutMapping("/users/{id}")
	public User updateUser(@PathVariable Long id,@RequestBody User u)throws ResourceNotFoundException {{
		User u1 = userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("user not found ==> id = " + id));
		u1.setNom(u.getNom());
		u1.setPrenom(u.getPrenom());
		u1.setTel(u.getTel());
		u1.setDateNaissance(u.getDateNaissance());
		u1.setEmail(u.getEmail());
		return userRepository.save(u1);
	}

	}


}
