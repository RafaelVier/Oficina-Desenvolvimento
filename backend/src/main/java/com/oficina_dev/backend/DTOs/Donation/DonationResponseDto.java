package com.oficina_dev.backend.DTOs.Donation;


import com.oficina_dev.backend.DTOs.DonationItem.DonationItemResponseDto;
import com.oficina_dev.backend.DTOs.Person.PersonResponseDto;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

public record DonationResponseDto(
        UUID giverId,
        UUID voluntaryId,
        ZonedDateTime date,
        List<DonationItemResponseDto> items
) { }
