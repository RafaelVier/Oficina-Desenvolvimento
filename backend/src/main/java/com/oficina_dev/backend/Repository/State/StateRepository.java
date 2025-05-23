package com.oficina_dev.backend.Repository.State;

import com.oficina_dev.backend.Models.State.State;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface StateRepository extends JpaRepository<State, UUID> {
}