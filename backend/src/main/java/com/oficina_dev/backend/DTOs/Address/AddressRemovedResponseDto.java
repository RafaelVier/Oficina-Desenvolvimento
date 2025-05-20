package com.oficina_dev.backend.DTOs.Address;


import java.time.ZonedDateTime;

public record AddressRemovedResponseDto(
        String message,
        String street,
        int number,
        ZonedDateTime time
) { }
