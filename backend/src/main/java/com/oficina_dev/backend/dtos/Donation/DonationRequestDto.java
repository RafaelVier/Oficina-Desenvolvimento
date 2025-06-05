package com.oficina_dev.backend.dtos.Donation;

import com.oficina_dev.backend.dtos.DonationItem.DonationItemRequestDto;
import jakarta.validation.constraints.NotBlank;

import java.util.List;
import java.util.UUID;

public class DonationRequestDto {
    @NotBlank
    private UUID personId;

    @NotBlank
    private UUID voluntaryId;

    @NotBlank
    private List<DonationItemRequestDto> donationItems;

}
