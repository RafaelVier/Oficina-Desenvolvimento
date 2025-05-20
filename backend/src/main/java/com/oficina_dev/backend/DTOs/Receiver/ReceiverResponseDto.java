package com.oficina_dev.backend.DTOs.Receiver;


import com.oficina_dev.backend.DTOs.Person.PersonResponseDto;
import com.oficina_dev.backend.DTOs.ReceiverLimit.ReceiverLimitResponseDto;
import com.oficina_dev.backend.DTOs.TransferDonation.TransferDonationResponseDto;

import java.util.List;
import java.util.UUID;

public record ReceiverResponseDto(
        UUID id,
        PersonResponseDto person,
        String nif,
        Boolean isFit,
        ReceiverLimitResponseDto receiverLimit,
        List<TransferDonationResponseDto> receivedDonations
) { }
