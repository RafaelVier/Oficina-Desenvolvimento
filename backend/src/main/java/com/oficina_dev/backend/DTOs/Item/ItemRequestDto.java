package com.oficina_dev.backend.DTOs.Item;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
public class ItemRequestDto {

    @NotBlank
    @Size(min = 3, max = 100)
    private String name;

    @NotBlank
    private char sex;

    @NotBlank
    private UUID categoryId;

    @NotBlank
    private UUID sizeId;

}
