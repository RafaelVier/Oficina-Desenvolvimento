package com.oficina_dev.backend.DTOs.TransferDonationItem;


import com.oficina_dev.backend.DTOs.Item.ItemResponseDto;

import java.util.UUID;

public record TransferDonationItemResponseDto(
        UUID transferDonationId,
        ItemResponseDto item,
        int quantity
) { }
