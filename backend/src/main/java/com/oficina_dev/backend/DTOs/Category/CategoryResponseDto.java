package com.oficina_dev.backend.DTOs.Category;


import java.util.UUID;

public record CategoryResponseDto(
        UUID id,
        String name
) { }
