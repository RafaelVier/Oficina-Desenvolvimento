package com.oficina_dev.backend.dtos.Voluntary;

import jakarta.validation.constraints.NotBlank;

import java.util.UUID;

public class VoluntaryRequestDto {

    @NotBlank
    UUID personId;

    @NotBlank
    String password;

}
