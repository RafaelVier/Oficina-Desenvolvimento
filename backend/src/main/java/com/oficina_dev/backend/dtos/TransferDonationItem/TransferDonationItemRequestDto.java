package com.oficina_dev.backend.dtos.TransferDonationItem;

import jakarta.validation.constraints.NotBlank;

import java.util.UUID;

public class TransferDonationItemRequestDto {

    @NotBlank
    private UUID itemId;

    @NotBlank
    int quantity;

}
