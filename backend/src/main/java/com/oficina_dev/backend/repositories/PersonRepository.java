package com.oficina_dev.backend.repositories;

import com.oficina_dev.backend.models.Person.Person;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PersonRepository extends JpaRepository<Person, UUID> {
}
