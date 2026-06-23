package com.linkvault.backend.dto;

import jakarta.validation.constraints.NotBlank;

public class LoginRequest {
    @NotBlank
    @jakarta.validation.constraints.Email
    @jakarta.validation.constraints.Size(max = 50)
    private String email;

    @NotBlank
    @jakarta.validation.constraints.Size(min = 8, max = 40)
    private String password;

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
