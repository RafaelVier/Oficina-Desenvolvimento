package com.oficina_dev.backend.dtos.TransferDonation;


import com.oficina_dev.backend.dtos.DonationItem.DonationItemResponseDto;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

public record TransferDonationResponseDto(
        UUID giverId,
        UUID voluntaryId,
        ZonedDateTime date,
        List<DonationItemResponseDto> items
) { }
