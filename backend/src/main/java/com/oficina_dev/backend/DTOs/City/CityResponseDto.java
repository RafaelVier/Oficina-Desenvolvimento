package com.oficina_dev.backend.DTOs.City;


import com.oficina_dev.backend.DTOs.State.StateResponseDto;

public record CityResponseDto(
        String name,
        StateResponseDto state
) { }
