package com.oficina_dev.backend.repositories;

import com.oficina_dev.backend.models.TransferDonationItem.TransferDonationItem;
import com.oficina_dev.backend.models.TransferDonationItem.TransferDonationItemId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransferDonationItemRepository extends JpaRepository<TransferDonationItem, TransferDonationItemId> {
}