package com.oficina_dev.backend.dtos.TransferDonation;

import com.oficina_dev.backend.dtos.TransferDonationItem.TransferDonationItemRequestDto;
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
