package com.oficina_dev.backend.repositories;

import com.oficina_dev.backend.models.ReceiverLimit;
import com.oficina_dev.backend.models.ReceiverLimitId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReceiverLimitRepository extends JpaRepository<ReceiverLimit, ReceiverLimitId> {
}