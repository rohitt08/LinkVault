package com.linkvault.backend.controller;

import com.linkvault.backend.dto.ShortenRequest;
import com.linkvault.backend.dto.ShortenResponse;
import com.linkvault.backend.dto.UnlockRequest;
import com.linkvault.backend.model.ShortLink;
import com.linkvault.backend.model.User;
import com.linkvault.backend.repository.UserRepository;
import com.linkvault.backend.security.services.UserDetailsImpl;
import com.linkvault.backend.service.RateLimitingService;
import com.linkvault.backend.service.UrlService;
import com.linkvault.backend.util.QrCodeUtil;
import io.github.bucket4j.Bucket;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Map;

@RestController
public class UrlController {

    private final UrlService urlService;
    private final RateLimitingService rateLimitingService;
    private final UserRepository userRepository;

    @org.springframework.beans.factory.annotation.Value("${linkvault.app.frontendUrl}")
    private String frontendUrl;

    @org.springframework.beans.factory.annotation.Value("${linkvault.app.backendUrl}")
    private String backendUrl;

    @Autowired
    public UrlController(UrlService urlService, RateLimitingService rateLimitingService, UserRepository userRepository) {
        this.urlService = urlService;
        this.rateLimitingService = rateLimitingService;
        this.userRepository = userRepository;
    }

    @PostMapping("/api/links/shorten")
    public ResponseEntity<?> shortenUrl(@Valid @RequestBody ShortenRequest request) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null || !authentication.isAuthenticated() || "anonymousUser".equals(authentication.getPrincipal())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("You must be logged in to shorten a URL.");
            }

            UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
            Long userId = userDetails.getId();

            Bucket bucket = rateLimitingService.resolveLinkBucket(userId);
            if (!bucket.tryConsume(1)) {
                return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS)
                        .body("Too Many Request TRY AFTER SOMETIME");
            }

            User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

            ShortLink link = urlService.shortenUrl(request.getOriginalUrl(), request.getCustomAlias(), request.getPassword(), request.getExpiresAt(), user);
            
            // Generate QR Code
            String qrCode = QrCodeUtil.generateQrCodeBase64(backendUrl + "/" + link.getAlias());
            
            ShortenResponse response = new ShortenResponse(link, qrCode);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{alias}")
    public ResponseEntity<Void> redirectUrl(@PathVariable String alias) {
        Optional<ShortLink> linkOpt = urlService.getLinkByAlias(alias);
        
        if (linkOpt.isPresent()) {
            ShortLink link = linkOpt.get();
            
            if (link.getExpiresAt() != null && LocalDateTime.now().isAfter(link.getExpiresAt())) {
                HttpHeaders headers = new HttpHeaders();
                headers.setLocation(URI.create(frontendUrl + "/expired"));
                return new ResponseEntity<>(headers, HttpStatus.FOUND);
            }
            
            if (link.getPassword() != null && !link.getPassword().trim().isEmpty()) {
                HttpHeaders headers = new HttpHeaders();
                headers.setLocation(URI.create(frontendUrl + "/unlock/" + alias));
                return new ResponseEntity<>(headers, HttpStatus.FOUND);
            }
            
            urlService.incrementClicks(link);
            
            HttpHeaders headers = new HttpHeaders();
            headers.setLocation(URI.create(link.getOriginalUrl()));
            return new ResponseEntity<>(headers, HttpStatus.FOUND);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PostMapping("/api/links/{alias}/unlock")
    public ResponseEntity<?> unlockUrl(@PathVariable String alias, @RequestBody UnlockRequest request) {
        Optional<ShortLink> linkOpt = urlService.getLinkByAlias(alias);
        if (linkOpt.isPresent()) {
            ShortLink link = linkOpt.get();
            if (link.getExpiresAt() != null && LocalDateTime.now().isAfter(link.getExpiresAt())) {
                return ResponseEntity.status(HttpStatus.GONE).body(Map.of("message", "Link expired"));
            }
            
            if (link.getPassword() != null && link.getPassword().equals(request.getPassword())) {
                urlService.incrementClicks(link);
                return ResponseEntity.ok(Map.of("originalUrl", link.getOriginalUrl()));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Invalid password"));
            }
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/api/links/history")
    public ResponseEntity<?> getUserHistory() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated() || "anonymousUser".equals(authentication.getPrincipal())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("You must be logged in to view history.");
        }

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        Long userId = userDetails.getId();

        java.util.List<ShortLink> links = urlService.getLinksByUserId(userId);
        return ResponseEntity.ok(links);
    }

    @DeleteMapping("/api/links/{id}")
    public ResponseEntity<?> deleteLink(@PathVariable Long id) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated() || "anonymousUser".equals(authentication.getPrincipal())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("You must be logged in to delete a link.");
        }

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        Long userId = userDetails.getId();

        boolean deleted = urlService.deleteLink(id, userId);
        if (deleted) {
            return ResponseEntity.ok(Map.of("message", "Link deleted successfully"));
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You do not have permission to delete this link or it does not exist.");
        }
    }
}
