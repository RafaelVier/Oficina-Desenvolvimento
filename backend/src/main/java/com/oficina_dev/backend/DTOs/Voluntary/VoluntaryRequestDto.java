package com.oficina_dev.backend.DTOs.Voluntary;

import com.oficina_dev.backend.DTOs.Person.PersonRequestDto;
import jakarta.validation.constraints.NotBlank;

import java.util.UUID;

public class VoluntaryRequestDto {

    @NotBlank
    UUID personId;

    @NotBlank
    String password;

}
