package com.oficina_dev.backend.dtos.City;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
public class CityRequestUpdateDto {

    @NotBlank
    @Size(min = 3, max = 100)
    private String name;

    @NotBlank
    private UUID idState;

}
