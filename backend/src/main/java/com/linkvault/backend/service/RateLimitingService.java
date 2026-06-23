package com.linkvault.backend.service;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Refill;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class RateLimitingService {

    private final Map<String, Bucket> authCache = new ConcurrentHashMap<>();
    private final Map<Long, Bucket> linkCache = new ConcurrentHashMap<>();

    public Bucket resolveAuthBucket(String ip) {
        return authCache.computeIfAbsent(ip, this::newAuthBucket);
    }

    public Bucket resolveLinkBucket(Long userId) {
        return linkCache.computeIfAbsent(userId, this::newLinkBucket);
    }

    private Bucket newAuthBucket(String ip) {
        // 5 requests per minute
        Refill refill = Refill.greedy(5, Duration.ofMinutes(1));
        Bandwidth limit = Bandwidth.classic(5, refill);
        return Bucket.builder()
                .addLimit(limit)
                .build();
    }

    private Bucket newLinkBucket(Long userId) {
        // 10 requests per day
        Refill refill = Refill.greedy(10, Duration.ofDays(1));
        Bandwidth limit = Bandwidth.classic(10, refill);
        return Bucket.builder()
                .addLimit(limit)
                .build();
    }
}
