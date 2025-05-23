package com.oficina_dev.backend.Repository.Voluntary;

import com.oficina_dev.backend.Models.Voluntary.Voluntary;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface VoluntaryRepository extends JpaRepository<Voluntary, UUID> {
}