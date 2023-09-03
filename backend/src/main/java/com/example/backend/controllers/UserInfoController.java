package com.example.backend.controllers;

import java.time.Duration;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.backend.dto.AuthRequest;
import com.example.backend.models.UserInfo;
import com.example.backend.repository.UserInfoRepository;
import com.example.backend.service.JwtService;
import com.example.backend.service.UserInfoService;
import com.example.backend.services.EmailService;
import com.example.backend.DTOs.PayerDTO;
import com.example.backend.DTOs.emailDTO;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/userInfo")
public class UserInfoController {

	@Autowired
	private UserInfoService userInfoService;
	
	@Autowired
	private UserInfoRepository userInfoRepo;
	
	@Autowired
	private JwtService jwtService;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private EmailService emailService;

	@Autowired
	private PasswordEncoder passwordEncoder;

	
	@PostMapping("/register")
	public String addNewUser(@RequestBody UserInfo userInfo) {
		return userInfoService.addUser(userInfo);
		
	}
	
	@PostMapping("/authenticate")
	public String authenticateAndGetToken(@RequestBody AuthRequest authRequest) {
		
		UserInfo currentUser = userInfoService.findByEmail(authRequest.getEmail());
		System.out.println("this is the userInfo object that we found: " + currentUser.getUserFirstname());
		long timeElapsed = 300001;
		
		if (!currentUser.getResetRecently().equals("no")) {
			
			String dateTimeOfReset = currentUser.getResetRecently();
			Instant dateTimeNow = Instant.now();

			//
			
		
	    	
			
			
			//
			String pattern = "hh:mm:ss a, EEE M/d/uuuu"; 
			//DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern(pattern, Locale.US);
			
			DateTimeFormatter formatter = DateTimeFormatter.ofLocalizedDateTime( FormatStyle.LONG )
                    .withLocale( Locale.US )
                    .withZone( ZoneId.systemDefault() );
			
			LocalDateTime localDateTime = LocalDateTime.parse(dateTimeOfReset, formatter);
			ZoneId zoneId = ZoneId.of("America/Chicago"); 
			ZonedDateTime zonedDateTime = localDateTime.atZone(zoneId); 
			Instant instantCovertedResetTime = zonedDateTime.toInstant();
			
			timeElapsed = Duration.between(instantCovertedResetTime, dateTimeNow).toMillis();

			System.out.println("this is the userInfo object that we found: " + currentUser.getUserFirstname());
			System.out.println("this was the time of reset as a string in the db: " + dateTimeOfReset.toString());
			System.out.println("this was the time of reset converted back to an INSTANT: " + instantCovertedResetTime);
			System.out.println("this is the instantDateTime generated now as an INSTANT: " + dateTimeNow);
			System.out.println("this IS HOW MUCH time has elapsed: " + timeElapsed);
			
		}
		
		if (currentUser.getResetRecently().equals("no") || timeElapsed <= 300000) {
				
				
				currentUser.setResetRecently("no");	
				userInfoRepo.save(currentUser);
					
				Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword())); 
					
				if(authentication.isAuthenticated()) {
					
					this.userInfoService.checkCardUpdate(authRequest.getEmail());
					
					return jwtService.generateToken(authRequest.getEmail());
					
				} else {
					
					throw new UsernameNotFoundException("Invalid.");
					
				}
		
		} else {
			
			return "invalid";
			
		}
		
	}

   	@GetMapping("/getProfile")
    public ResponseEntity<UserInfo> getUserProfile() {
       	System.out.println("Start of getProfile method"); 
	   	Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUserName = authentication.getName();
        System.out.println("controller method called getProfile " + currentUserName);
        UserInfo currentUserDto = userInfoRepo.findByEmail(currentUserName)
        		.orElseThrow(()-> new UsernameNotFoundException("UserInfo not found " + currentUserName ));;

        return ResponseEntity.ok(currentUserDto);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request, HttpServletResponse response) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null) {
            new SecurityContextLogoutHandler().logout(request, response, authentication);
            request.getSession().invalidate();
            return ResponseEntity.ok("User logged out successfully.");
        }
       
        return ResponseEntity.ok("No user to log out.");
    }
	 
    @PostMapping("/update")
    public String update(@RequestBody UserInfo userInfo){
    	Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    	if (authentication != null) {
    		userInfoService.updateUserInfo(userInfo);
    		return jwtService.generateToken(userInfo.getEmail());
        }
       
        return "Updating user information requires authentication";
    }
    
    @PostMapping("/updatePassword")
    public String updatePassword(@RequestBody UserInfo userInfo) {
    	Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    	if (authentication != null) {
    		userInfoService.updatePassword(userInfo);
    		return jwtService.generateToken(userInfo.getEmail());
        }
    	return "Updating password requires authentication";
    }
    
    @GetMapping("/tokenExpiration")
    public boolean isTokenExpired(@RequestParam String token) throws ExpiredJwtException {
    	try {
    		return this.jwtService.isTokenExpired(token);
    	} catch (ExpiredJwtException e) {
    		return true;
    	}
    }

    @PostMapping("/forgotPassword")
    public String forgotMyPassword(@RequestBody emailDTO emailDTO) {
    	
    	try {
    		
    		//create three variables to send in the email
	    	String to = emailDTO.getEmail();
	    	String subject = "This is your temporary password, this password will expire in 5 minutes";
	    	String tempPassword = "Temporary1234!";
	    	
	    	// change the password to temp password
	    	UserInfo userInfo = userInfoService.findByEmail(to);
	    	userInfo.setPassword(passwordEncoder.encode(tempPassword));

	    	// set the time/date it was reset 
	    	DateTimeFormatter formatter = DateTimeFormatter.ofLocalizedDateTime( FormatStyle.LONG )
                    .withLocale( Locale.US )
                    .withZone( ZoneId.systemDefault() );
	    	Instant dateTimeOfReset = Instant.now();
	    	String dateTimeString = formatter.format(dateTimeOfReset);
	    	userInfo.setResetRecently(dateTimeString);
	    	
	    	// update the userInfo information
			userInfoRepo.save(userInfo);
			
			// send email with new password
	    	emailService.sendSimpleMessage(to, subject, tempPassword);
	    	
	    	return "success";
    	
    	} catch (Exception e) {
    		
    		return "failure";
    		
    	}
    	
    }
    
}
