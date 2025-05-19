package com.oficina_dev.backend.DTOs.DonationItem;

import jakarta.validation.constraints.NotBlank;

import java.util.List;
import java.util.UUID;

public class DonationItemRequestDto {

    @NotBlank
    private UUID itemId;

    @NotBlank
    int quantity;

}
