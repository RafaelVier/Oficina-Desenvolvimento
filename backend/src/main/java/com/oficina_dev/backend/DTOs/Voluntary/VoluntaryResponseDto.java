package com.oficina_dev.backend.DTOs.Voluntary;


import com.oficina_dev.backend.DTOs.Donation.DonationResponseDto;
import com.oficina_dev.backend.DTOs.Person.PersonResponseDto;

import java.util.List;
import java.util.UUID;

public record VoluntaryResponseDto(
        UUID id,
        PersonResponseDto person,
        Boolean active
) { }
