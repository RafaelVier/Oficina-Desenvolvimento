package com.oficina_dev.backend.DTOs.Person;


import com.oficina_dev.backend.DTOs.Address.AddressResponseDto;

public record PersonResponseDto(
        String name,
        String phone,
        String email,
        String cpf,
        AddressResponseDto address
) { }
