package com.oficina_dev.backend.DTOs.Donation;

import com.oficina_dev.backend.DTOs.DonationItem.DonationItemRequestDto;
import com.oficina_dev.backend.DTOs.Person.PersonRequestDto;
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
