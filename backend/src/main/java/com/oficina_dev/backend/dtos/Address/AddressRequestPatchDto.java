package com.oficina_dev.backend.dtos.Address;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
public class AddressRequestPatchDto {

    private int number;

    @Size(min = 1, max = 100)
    private String street;

    @Size(min = 1, max = 100)
    private String neighborhood;

    @Size(min = 1, max = 100)
    private String complement;

    @Size(min = 1, max = 100)
    private String referencePoint;

    private UUID idCity;
}
