package com.oficina_dev.backend.services;

import com.oficina_dev.backend.mappers.DonationMapper;
import com.oficina_dev.backend.models.Donation.Donation;
import com.oficina_dev.backend.repositories.DonationRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class DonationService {

    @Autowired
    DonationMapper donationMapper;

    @Autowired
    DonationRepository donationRepository;

    public Donation findById(UUID id) {
        return this.donationRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Donation not found"));
    }






}
