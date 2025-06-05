package com.oficina_dev.backend.dtos.Receiver;

import jakarta.validation.constraints.NotBlank;

import java.util.UUID;

public class ReceiverRequestDto {

    @NotBlank
    UUID personId;

    @NotBlank
    String password;

    @NotBlank
    Boolean isFit;

    String nif;

}
