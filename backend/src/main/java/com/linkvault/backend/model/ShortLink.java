package com.linkvault.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "short_links")
public class ShortLink {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, length = 2048)
    private String originalUrl;
    
    @Column(nullable = false, unique = true)
    private String alias;
    
    private int clicks = 0;
    
    // Links to the User who created it (can be null for anonymous links)
    @com.fasterxml.jackson.annotation.JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    
    private LocalDateTime createdAt;
    
    @Column(length = 255)
    private String password;
    
    private LocalDateTime expiresAt;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getOriginalUrl() { return originalUrl; }
    public void setOriginalUrl(String originalUrl) { this.originalUrl = originalUrl; }
    
    public String getAlias() { return alias; }
    public void setAlias(String alias) { this.alias = alias; }
    
    public int getClicks() { return clicks; }
    public void setClicks(int clicks) { this.clicks = clicks; }
    
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    
    public LocalDateTime getExpiresAt() { return expiresAt; }
    public void setExpiresAt(LocalDateTime expiresAt) { this.expiresAt = expiresAt; }
}
