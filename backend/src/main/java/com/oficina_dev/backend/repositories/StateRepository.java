package com.oficina_dev.backend.repositories;

import com.oficina_dev.backend.models.State.State;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface StateRepository extends JpaRepository<State, UUID> {
}