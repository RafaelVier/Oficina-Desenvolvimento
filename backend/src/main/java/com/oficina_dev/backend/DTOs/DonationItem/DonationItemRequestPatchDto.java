package com.oficina_dev.backend.DTOs.DonationItem;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
public class DonationItemRequestPatchDto {
    private UUID itemId;
    int quantity;
}
