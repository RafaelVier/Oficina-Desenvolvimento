package com.oficina_dev.backend.DTOs.Giver;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
public class GiverRequestPatchDto {
    UUID personId;
}
