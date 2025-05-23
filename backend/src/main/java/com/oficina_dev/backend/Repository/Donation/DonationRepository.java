package com.oficina_dev.backend.Repository.Donation;

import com.oficina_dev.backend.Models.Donation.Donation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface DonationRepository extends JpaRepository<Donation, UUID> {
}