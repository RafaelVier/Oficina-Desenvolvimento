package com.oficina_dev.backend.repositories;

import com.oficina_dev.backend.models.City.City;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CityRepository extends JpaRepository<City, UUID> {
}