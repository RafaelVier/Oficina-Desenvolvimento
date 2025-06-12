package com.oficina_dev.backend.dtos.State;


import java.util.UUID;

public record StateResponseDto(
        UUID id,
        String name,
        String abbreviation
) { }
