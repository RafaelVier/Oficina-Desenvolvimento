package com.oficina_dev.backend.DTOs.State;


import java.time.ZonedDateTime;

public record StateRemovedResponseDto(
        String message,
        String name,
        ZonedDateTime time
) { }
