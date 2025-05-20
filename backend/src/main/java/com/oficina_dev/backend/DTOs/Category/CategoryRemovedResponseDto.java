package com.oficina_dev.backend.DTOs.Category;


import java.time.ZonedDateTime;

public record CategoryRemovedResponseDto(
        String message,
        String name,
        ZonedDateTime time
) { }
