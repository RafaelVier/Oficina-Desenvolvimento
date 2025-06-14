package com.oficina_dev.backend.dtos.TransferDonationItem;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
public class TransferDonationItemRequestPatchDto {
    private UUID itemId;
    int quantity;
}
