package com.example.backend.service;

import java.security.Key;
import java.util.HashMap;
import java.util.Map;
import java.util.Date;
import org.springframework.cglib.core.internal.Function;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtService {

	public static final String SECRET = "djs85kh86k2jfur75960fhr96mhu7k3jf8699dh422hfur75nh4jf85767783hty1234ed1d1f12asdw114wn2";
	
	                                  //"4A614E645267556A586E3272357538782F413F4428472B4B6250655368566D59"
	
	public String extractUsername(String token) {
		
		return extractClaim(token, Claims::getSubject);
		
	}
	
	public Date extractExpiration(String token) {
		System.out.println(extractClaim(token, Claims::getExpiration));
		return extractClaim(token, Claims::getExpiration);
	}
	
	public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
		final Claims claims = extractAllClaims(token);
		return claimsResolver.apply(claims);
	}
	
	private Claims extractAllClaims(String token) {
		return Jwts
				.parserBuilder()
				.setSigningKey(getSignKey())
				.build()
				.parseClaimsJws(token)
				.getBody();
	}
	
	public Boolean isTokenExpired(String token) {
		return extractExpiration(token).before(new Date());
	}
	
	public Boolean validateToken(String token, UserDetails userDetails) {
		final String email = extractUsername(token);
		return (email.equals(userDetails.getUsername()) && !isTokenExpired(token));
	}
	
	public String generateToken(String userName) {
		
		Map<String, Object> claims = new HashMap<>();
		return createToken(claims, userName);
		
	}
	
	private String createToken(Map<String, Object> claims, String userName) {
		
		return Jwts.builder()
				.setClaims(claims)
				.setSubject(userName)
				.setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + 1000*60*30))
				.signWith(getSignKey(), SignatureAlgorithm.HS512).compact();
		
	}

	private Key getSignKey() {
		
		byte[] keyBytes = Decoders.BASE64.decode(SECRET);
		
		return Keys.hmacShaKeyFor(keyBytes);
	}
	
	
	
}
