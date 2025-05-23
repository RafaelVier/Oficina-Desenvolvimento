package com.oficina_dev.backend.Repository.Size;

import com.oficina_dev.backend.Models.Size.Size;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface SizeRepository extends JpaRepository<Size, UUID> {
}