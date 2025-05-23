package com.oficina_dev.backend.Repository.Category;

import com.oficina_dev.backend.Models.Category.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CategoryRepository extends JpaRepository<Category, UUID> {
}