package com.oficina_dev.backend.DTOs.Item;


import java.time.ZonedDateTime;

public record ItemRemovedResponseDto(
        String message,
        String name,
        ZonedDateTime time
) { }
