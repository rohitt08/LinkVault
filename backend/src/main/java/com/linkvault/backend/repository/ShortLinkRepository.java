package com.linkvault.backend.repository;

import com.linkvault.backend.model.ShortLink;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ShortLinkRepository extends JpaRepository<ShortLink, Long> {
    Optional<ShortLink> findByAlias(String alias);
    boolean existsByAlias(String alias);
    List<ShortLink> findByUserId(Long userId);
}
