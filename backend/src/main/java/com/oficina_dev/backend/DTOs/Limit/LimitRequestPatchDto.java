package com.oficina_dev.backend.DTOs.Limit;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
public class LimitRequestPatchDto {
    private int month;
    private int year;
    private int limitQuantity;
}
