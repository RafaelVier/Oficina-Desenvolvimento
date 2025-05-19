package com.oficina_dev.backend.DTOs.Receiver;

import com.oficina_dev.backend.DTOs.Person.PersonRequestDto;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
public class ReceiverRequestPatchDto {
    UUID personId;
    String password;
    Boolean isFit;
    String nif;
}
