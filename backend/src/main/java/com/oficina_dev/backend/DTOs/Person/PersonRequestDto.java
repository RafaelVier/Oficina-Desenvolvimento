package com.oficina_dev.backend.DTOs.Person;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.UUID;

public class PersonRequestDto {
    @NotBlank
    @Size(min = 2,max = 100)
    private String name;

    @NotBlank
    @Size(min = 8,max = 20)
    private String phone;

    @Email
    @Size(min = 4,max = 320)
    private String email;

    @NotBlank
    @Size(min = 11,max = 14)
    private String cpf;

    @NotBlank
    private UUID idAddress;
}
