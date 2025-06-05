package com.oficina_dev.backend.repositories;

import com.oficina_dev.backend.models.Limit.Limit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface LimitRepository extends JpaRepository<Limit, UUID> {
}