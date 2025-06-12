package com.oficina_dev.backend.dtos.Person;


import com.oficina_dev.backend.dtos.Address.AddressResponseDto;

public record PersonResponseDto(
        String name,
        String phone,
        String email,
        String cpf,
        AddressResponseDto address
) { }
