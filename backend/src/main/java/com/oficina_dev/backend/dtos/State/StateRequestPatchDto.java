package com.oficina_dev.backend.dtos.State;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class StateRequestPatchDto {

    @Size(min = 3, max = 100)
    private String name;

    @Size(min = 2, max = 2)
    private String abbreviation;
}
