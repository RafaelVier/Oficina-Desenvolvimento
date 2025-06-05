package com.oficina_dev.backend.dtos.State;


import java.time.ZonedDateTime;

public record StateRemovedResponseDto(
        String message,
        String name,
        ZonedDateTime time
) { }
