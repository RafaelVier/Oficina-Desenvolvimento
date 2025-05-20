package com.oficina_dev.backend.DTOs.TransferDonation;

import com.oficina_dev.backend.DTOs.TransferDonationItem.TransferDonationItemRequestDto;
import jakarta.validation.constraints.NotBlank;

import java.util.List;
import java.util.UUID;

public class TransferDonationRequestDto {
    @NotBlank
    private UUID receiverId;

    @NotBlank
    private UUID voluntaryId;

    @NotBlank
    private List<TransferDonationItemRequestDto> transferDonationItems;
}
