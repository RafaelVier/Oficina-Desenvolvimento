package com.oficina_dev.backend.repositories;

import com.oficina_dev.backend.models.Voluntary;
import jakarta.validation.constraints.NotBlank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface VoluntaryRepository extends JpaRepository<Voluntary, UUID> {

    Optional<Voluntary> findByPersonIdAndPassword(UUID id, @NotBlank String password);

}