package com.oficina_dev.backend.DTOs.ReceiverLimit;

import com.oficina_dev.backend.DTOs.Limit.LimitResponseDto;

import java.util.UUID;

public record ReceiverLimitResponseDto(
        UUID receiverId,
        LimitResponseDto limit,
        int caughtItems
) {}
