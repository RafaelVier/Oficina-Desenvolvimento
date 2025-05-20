package com.oficina_dev.backend.DTOs.Giver;


import com.oficina_dev.backend.DTOs.Address.AddressResponseDto;
import com.oficina_dev.backend.DTOs.Donation.DonationResponseDto;
import com.oficina_dev.backend.DTOs.Person.PersonResponseDto;

import java.util.List;

public record GiverResponseDto(
        PersonResponseDto person,
        List<DonationResponseDto> donations
) { }
