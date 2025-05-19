package com.oficina_dev.backend.DTOs.Item;


import com.oficina_dev.backend.DTOs.Category.CategoryResponseDto;
import com.oficina_dev.backend.DTOs.Size.SizeResponseDto;

import java.util.UUID;

public record ItemResponseDto(
        UUID id,
        String name,
        SizeResponseDto size,
        CategoryResponseDto category
) { }
