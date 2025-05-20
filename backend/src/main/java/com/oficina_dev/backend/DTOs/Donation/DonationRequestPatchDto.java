package com.oficina_dev.backend.DTOs.Donation;

import com.oficina_dev.backend.DTOs.DonationItem.DonationItemRequestDto;
import com.oficina_dev.backend.DTOs.Person.PersonRequestPatchDto;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
public class DonationRequestPatchDto {
    private UUID personId;
    private UUID voluntaryId;
    private List<DonationItemRequestDto> donationItems;
}
