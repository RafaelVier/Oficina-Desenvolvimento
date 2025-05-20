package com.oficina_dev.backend.DTOs.Address;


import com.oficina_dev.backend.DTOs.State.StateResponseDto;

public record AddressResponseDto(
        String name,
        StateResponseDto state
) { }
