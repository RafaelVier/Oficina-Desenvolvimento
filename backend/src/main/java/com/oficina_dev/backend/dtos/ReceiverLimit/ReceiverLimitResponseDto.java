package com.oficina_dev.backend.dtos.ReceiverLimit;

import com.oficina_dev.backend.dtos.Limit.LimitResponseDto;

import java.util.UUID;

public record ReceiverLimitResponseDto(
        UUID receiverId,
        LimitResponseDto limit,
        int caughtItems
) {}
