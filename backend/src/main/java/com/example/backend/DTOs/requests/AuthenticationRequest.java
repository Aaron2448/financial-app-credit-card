package com.example.backend.DTOs.requests;

public record AuthenticationRequest(
        String email,
        String password
) {
}
