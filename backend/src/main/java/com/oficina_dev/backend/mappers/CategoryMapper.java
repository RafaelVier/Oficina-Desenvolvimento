package com.oficina_dev.backend.mappers;

import com.oficina_dev.backend.dtos.Category.CategoryResponseDto;
import com.oficina_dev.backend.models.Category.Category;
import org.springframework.stereotype.Component;

@Component
public class CategoryMapper {

    public CategoryResponseDto toResponse(Category category){
        return new CategoryResponseDto(
                category.getId(), category.getName()
        );
    };
}