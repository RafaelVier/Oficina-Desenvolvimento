package com.oficina_dev.backend.repositories;

import com.oficina_dev.backend.models.Voluntary.Voluntary;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface VoluntaryRepository extends JpaRepository<Voluntary, UUID> {
}