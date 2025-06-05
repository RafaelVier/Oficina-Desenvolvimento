package com.oficina_dev.backend.repositories;

import com.oficina_dev.backend.models.Giver.Giver;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface GiverRepository extends JpaRepository<Giver, UUID> {
}