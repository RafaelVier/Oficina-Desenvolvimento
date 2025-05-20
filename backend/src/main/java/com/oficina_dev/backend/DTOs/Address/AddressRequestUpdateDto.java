package com.oficina_dev.backend.DTOs.Address;

import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
public class AddressRequestUpdateDto {

    @NotBlank
    private int number;

    @NotBlank
    @Size(min = 1, max = 100)
    private String street;

    @NotBlank
    @Size(min = 1, max = 100)
    private String neighborhood;

    @NotBlank
    @Size(min = 1, max = 100)
    private String complement;

    @NotBlank
    @Size(min = 1, max = 100)
    private String referencePoint;

    @NotBlank
    private UUID idCity;

}
