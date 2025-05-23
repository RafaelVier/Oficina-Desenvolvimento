package com.oficina_dev.backend.Repository.ReceiverLimit;

import com.oficina_dev.backend.Models.ReceiverLimit.ReceiverLimit;
import com.oficina_dev.backend.Models.ReceiverLimit.ReceiverLimitId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReceiverLimitRepository extends JpaRepository<ReceiverLimit, ReceiverLimitId> {
}