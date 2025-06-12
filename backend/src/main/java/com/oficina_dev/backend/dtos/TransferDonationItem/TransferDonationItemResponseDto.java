package com.oficina_dev.backend.dtos.TransferDonationItem;


import com.oficina_dev.backend.dtos.Item.ItemResponseDto;

import java.util.UUID;

public record TransferDonationItemResponseDto(
        UUID transferDonationId,
        ItemResponseDto item,
        int quantity
) { }
