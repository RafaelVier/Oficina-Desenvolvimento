package com.oficina_dev.backend.Repository.Person;

import com.oficina_dev.backend.Models.Person.Person;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PersonRepository extends JpaRepository<Person, UUID> {
}
