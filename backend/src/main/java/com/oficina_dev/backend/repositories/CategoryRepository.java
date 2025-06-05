package com.oficina_dev.backend.repositories;

import com.oficina_dev.backend.models.Category.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CategoryRepository extends JpaRepository<Category, UUID> {
}