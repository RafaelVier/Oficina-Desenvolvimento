package com.oficina_dev.backend.Repository.Limit;

import com.oficina_dev.backend.Models.Limit.Limit;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface LimitRepository extends JpaRepository<Limit, UUID> {
}