package com.oficina_dev.backend.Repository.Giver;

import com.oficina_dev.backend.Models.Giver.Giver;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface GiverRepository extends JpaRepository<Giver, UUID> {
}