package com.oficina_dev.backend.controllers;

import com.oficina_dev.backend.dtos.Category.CategoryResponseDto;
import com.oficina_dev.backend.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/state")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/{id}")
    public ResponseEntity<CategoryResponseDto> getById(@PathVariable UUID id){
        CategoryResponseDto categoryResponseDto = categoryService.getById(id);
        return ResponseEntity.ok(categoryResponseDto);
    }
}
