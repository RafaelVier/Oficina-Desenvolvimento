package com.oficina_dev.backend.DTOs.Person;


import java.time.ZonedDateTime;

public record PersonRemovedResponseDto(
        String message,
        String name,
        ZonedDateTime time
) { }
