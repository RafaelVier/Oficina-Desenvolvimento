package com.oficina_dev.backend.models.Person;

import com.oficina_dev.backend.models.Address.Address;
import com.oficina_dev.backend.models.Cpf.Cpf;
import com.oficina_dev.backend.models.Email.Email;
import com.oficina_dev.backend.models.Giver.Giver;
import com.oficina_dev.backend.models.Receiver.Receiver;
import com.oficina_dev.backend.models.Voluntary.Voluntary;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.ZonedDateTime;
import java.util.UUID;

@Entity
@Table(name = "tb_people", schema = "Public")
public class Person {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "name", length = 100, nullable = false)
    private String name;

    @Column(name = "phone", length = 15, nullable = false)
    private String phone;

    @Embedded
    private Cpf cpf;

    @Embedded
    private Email email;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private ZonedDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private ZonedDateTime updatedAt;

    @OneToOne
    @JoinColumn(name = "id_address", referencedColumnName = "id")
    private Address address;

    @OneToOne(mappedBy = "person")
    private Giver giver;

    @OneToOne(mappedBy = "person")
    private Voluntary voluntary;

    @OneToOne(mappedBy = "person")
    private Receiver receiver;

}
