package com.oficina_dev.backend.Repository.City;

import com.oficina_dev.backend.Models.City.City;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CityRepository extends JpaRepository<City, UUID> {
}