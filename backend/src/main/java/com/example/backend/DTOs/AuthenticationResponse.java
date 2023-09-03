package com.example.backend.DTOs;

import lombok.Builder;

@Builder
public record AuthenticationResponse(
        String email,
        String name
) {
}
