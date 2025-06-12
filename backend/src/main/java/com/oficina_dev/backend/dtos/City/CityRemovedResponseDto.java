package com.oficina_dev.backend.dtos.City;


import java.time.ZonedDateTime;

public record CityRemovedResponseDto(
        String message,
        String name,
        ZonedDateTime time
) { }
