package com.oficina_dev.backend.dtos.Giver;

import jakarta.validation.constraints.NotBlank;

import java.util.UUID;

public class GiverRequestDto {
    @NotBlank
    UUID personId;
}
