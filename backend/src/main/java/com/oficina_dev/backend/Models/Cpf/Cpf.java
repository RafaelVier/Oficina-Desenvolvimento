package com.oficina_dev.backend.Models.Cpf;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class Cpf {

    @Column(name = "cpf", length = 11)
    private String cpf;
}
