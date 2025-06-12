package com.oficina_dev.backend.dtos.Address;


import com.oficina_dev.backend.dtos.State.StateResponseDto;

public record AddressResponseDto(
        String name,
        StateResponseDto state
) { }
