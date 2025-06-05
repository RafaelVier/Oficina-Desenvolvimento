package com.oficina_dev.backend.dtos.Receiver;


import com.oficina_dev.backend.dtos.Person.PersonResponseDto;
import com.oficina_dev.backend.dtos.ReceiverLimit.ReceiverLimitResponseDto;
import com.oficina_dev.backend.dtos.TransferDonation.TransferDonationResponseDto;

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
