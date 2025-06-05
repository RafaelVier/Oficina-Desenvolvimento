package com.oficina_dev.backend.models.Cpf;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class Cpf {

    @Column(name = "cpf", length = 11)
    private String cpf;
}
