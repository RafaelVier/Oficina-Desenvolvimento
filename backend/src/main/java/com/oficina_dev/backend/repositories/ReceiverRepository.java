package com.oficina_dev.backend.repositories;

import com.oficina_dev.backend.models.Receiver.Receiver;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ReceiverRepository extends JpaRepository<Receiver, UUID> {
}