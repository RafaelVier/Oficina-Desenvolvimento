package com.oficina_dev.backend.Repository.Address;

import com.oficina_dev.backend.Models.Address.Address;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AddressRepository extends JpaRepository<Address, UUID> {
}