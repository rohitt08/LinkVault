package com.linkvault.backend.service;

import com.linkvault.backend.model.ShortLink;
import com.linkvault.backend.model.User;
import com.linkvault.backend.repository.ShortLinkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Random;

@Service
public class UrlService {

    private final ShortLinkRepository shortLinkRepository;
    private static final String CHARACTERS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final int ALIAS_LENGTH = 6;

    @Autowired
    public UrlService(ShortLinkRepository shortLinkRepository) {
        this.shortLinkRepository = shortLinkRepository;
    }

    public ShortLink shortenUrl(String originalUrl, String customAlias, String password, java.time.LocalDateTime expiresAt, User user) {
        String alias = customAlias;
        
        if (alias == null || alias.trim().isEmpty()) {
            alias = generateRandomAlias();
        } else {
            // Sanitize custom alias: replace spaces with hyphens, remove non-alphanumeric characters (except hyphens and underscores)
            alias = alias.trim().replaceAll("\\s+", "-").replaceAll("[^a-zA-Z0-9-_]", "");
            
            if (alias.isEmpty()) {
                alias = generateRandomAlias();
            } else if (shortLinkRepository.existsByAlias(alias)) {
                throw new IllegalArgumentException("Alias '" + alias + "' is already in use.");
            }
        }
        
        if (expiresAt != null) {
            java.time.LocalDateTime maxExpiration = java.time.LocalDateTime.now().plusYears(1);
            if (expiresAt.isAfter(maxExpiration)) {
                throw new IllegalArgumentException("Expiration date cannot be more than 1 year in the future.");
            }
            if (expiresAt.isBefore(java.time.LocalDateTime.now())) {
                throw new IllegalArgumentException("Expiration date cannot be in the past.");
            }
        }

        ShortLink link = new ShortLink();
        link.setOriginalUrl(originalUrl);
        link.setAlias(alias);
        link.setPassword(password);
        link.setExpiresAt(expiresAt);
        link.setUser(user); // Can be null if anonymous

        return shortLinkRepository.save(link);
    }

    public Optional<ShortLink> getLinkByAlias(String alias) {
        return shortLinkRepository.findByAlias(alias);
    }

    public void incrementClicks(ShortLink link) {
        link.setClicks(link.getClicks() + 1);
        shortLinkRepository.save(link);
    }

    private String generateRandomAlias() {
        Random random = new Random();
        StringBuilder sb = new StringBuilder(ALIAS_LENGTH);
        String alias;
        do {
            sb.setLength(0);
            for (int i = 0; i < ALIAS_LENGTH; i++) {
                sb.append(CHARACTERS.charAt(random.nextInt(CHARACTERS.length())));
            }
            alias = sb.toString();
        } while (shortLinkRepository.existsByAlias(alias));
        
        return alias;
    }
}
