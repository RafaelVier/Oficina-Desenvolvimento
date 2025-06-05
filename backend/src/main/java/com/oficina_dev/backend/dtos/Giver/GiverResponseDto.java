package com.oficina_dev.backend.dtos.Giver;


import com.oficina_dev.backend.dtos.Donation.DonationResponseDto;
import com.oficina_dev.backend.dtos.Person.PersonResponseDto;

import java.util.List;

public record GiverResponseDto(
        PersonResponseDto person,
        List<DonationResponseDto> donations
) { }
