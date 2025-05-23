package com.oficina_dev.backend.Repository.Receiver;

import com.oficina_dev.backend.Models.Receiver.Receiver;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ReceiverRepository extends JpaRepository<Receiver, UUID> {
}