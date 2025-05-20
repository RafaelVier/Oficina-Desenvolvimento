package com.oficina_dev.backend.DTOs.Limit;


import java.util.UUID;

public record LimitResponseDto(
        UUID id,
        int month,
        int year,
        int limitQuantity
) { }
