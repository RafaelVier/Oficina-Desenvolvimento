package com.oficina_dev.backend.Repository.DonationItem;

import com.oficina_dev.backend.Models.DonationItem.DonationItem;
import com.oficina_dev.backend.Models.DonationItem.DonationItemId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DonationItemRepository extends JpaRepository<DonationItem, DonationItemId> {
}