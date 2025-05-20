package com.oficina_dev.backend.DTOs.Voluntary;


import java.time.ZonedDateTime;

public record VoluntaryRemovedResponseDto(
        String message,
        String name,
        ZonedDateTime time
) { }
