package com.oficina_dev.backend.services;

import com.oficina_dev.backend.dtos.Category.CategoryResponseDto;
import com.oficina_dev.backend.exceptions.CategoryNotFoundException;
import com.oficina_dev.backend.mappers.CategoryMapper;
import com.oficina_dev.backend.models.Category.Category;
import com.oficina_dev.backend.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private CategoryMapper categoryMapper;


    private Category findById(UUID id){
        return categoryRepository.findById(id)
                .orElseThrow(CategoryNotFoundException::new);
    }

    public CategoryResponseDto getById(UUID id){
        Category category = this.findById(id);
        return categoryMapper.toResponse(category);
    }
}
