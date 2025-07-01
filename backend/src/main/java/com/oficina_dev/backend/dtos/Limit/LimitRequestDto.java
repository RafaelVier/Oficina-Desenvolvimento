package com.oficina_dev.backend.dtos.Limit;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class LimitRequestDto {

    @NotBlank
    private Integer month;

    @NotBlank
    private Integer year;

    @NotBlank
    private Integer limitQuantity;

}
