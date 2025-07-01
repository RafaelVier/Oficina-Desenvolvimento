package com.oficina_dev.backend.repositories;

import com.oficina_dev.backend.models.TransferItem;
import com.oficina_dev.backend.models.TransferItemId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransferItemRepository extends JpaRepository<TransferItem, TransferItemId> {
}