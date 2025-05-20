package com.oficina_dev.backend.DTOs.TransferDonation;

import com.oficina_dev.backend.DTOs.Person.PersonRequestPatchDto;
import com.oficina_dev.backend.DTOs.TransferDonationItem.TransferDonationItemRequestDto;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
public class TransferDonationRequestPatchDto {
    private UUID receiverId;
    private UUID voluntaryId;
    private List<TransferDonationItemRequestDto> transferDonationItems;
}
