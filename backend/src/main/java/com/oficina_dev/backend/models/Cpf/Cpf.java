package com.oficina_dev.backend.models.Cpf;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;

@Getter
@Embeddable
public class Cpf {

    @Column(name = "cpf", length = 11)
    private String cpf;

    public Cpf(String cpf) {
        this.setCpf(cpf);
    }

    public Cpf() {
        // Default constructor for JPA
    }

    public void setCpf(String cpf) {
        //TODO: Implement CPF validation logic here
        if (cpf == null || cpf.length() != 11) {
            throw new IllegalArgumentException("Invalid CPF: must be 11 digits long");
        }
        if (!cpf.matches("\\d{11}")) {
            throw new IllegalArgumentException("Invalid CPF: must contain only digits");
        }
        this.cpf = cpf;
    }


}
