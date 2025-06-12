package com.oficina_dev.backend.dtos.TransferDonation;

import com.oficina_dev.backend.dtos.TransferDonationItem.TransferDonationItemRequestDto;
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
