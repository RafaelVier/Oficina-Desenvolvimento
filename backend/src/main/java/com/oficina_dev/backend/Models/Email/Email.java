package com.oficina_dev.backend.Models.Email;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
public class Email {

    @Column(name = "email", length = 100)
    private String email;
}
