package com.oficina_dev.backend.DTOs.Limit;


import java.time.ZonedDateTime;

public record LimitRemovedResponseDto(
        String message,
        int month,
        int year,
        ZonedDateTime time
) { }
