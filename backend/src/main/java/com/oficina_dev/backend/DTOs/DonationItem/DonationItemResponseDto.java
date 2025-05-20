package com.oficina_dev.backend.DTOs.DonationItem;


import com.oficina_dev.backend.DTOs.Item.ItemResponseDto;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

public record DonationItemResponseDto(
        UUID donationId,
        ItemResponseDto item,
        int quantity
) { }
