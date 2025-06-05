package com.oficina_dev.backend.dtos.Limit;


import java.time.ZonedDateTime;

public record LimitRemovedResponseDto(
        String message,
        int month,
        int year,
        ZonedDateTime time
) { }
