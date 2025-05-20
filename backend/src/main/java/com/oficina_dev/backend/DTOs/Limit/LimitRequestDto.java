package com.oficina_dev.backend.DTOs.Limit;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
public class LimitRequestDto {

    @NotBlank
    private int month;

    @NotBlank
    private int year;

    @NotBlank
    private int limitQuantity;

}
