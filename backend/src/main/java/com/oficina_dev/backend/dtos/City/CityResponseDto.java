package com.oficina_dev.backend.dtos.City;


import com.oficina_dev.backend.dtos.State.StateResponseDto;

public record CityResponseDto(
        String name,
        StateResponseDto state
) { }
