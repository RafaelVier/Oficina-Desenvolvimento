package com.oficina_dev.backend.Repository.TransferDonationItem;

import com.oficina_dev.backend.Models.TransferDonationItem.TransferDonationItem;
import com.oficina_dev.backend.Models.TransferDonationItem.TransferDonationItemId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransferDonationItemRepository extends JpaRepository<TransferDonationItem, TransferDonationItemId> {
}