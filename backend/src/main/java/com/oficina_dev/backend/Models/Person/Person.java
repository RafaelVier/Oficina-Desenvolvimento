package com.oficina_dev.backend.Models.Person;

import com.oficina_dev.backend.Models.Address.Address;
import com.oficina_dev.backend.Models.Cpf.Cpf;
import com.oficina_dev.backend.Models.DonationItem.DonationItemId;
import com.oficina_dev.backend.Models.Email.Email;
import com.oficina_dev.backend.Models.Giver.Giver;
import com.oficina_dev.backend.Models.Receiver.Receiver;
import com.oficina_dev.backend.Models.Size.Size;
import com.oficina_dev.backend.Models.Voluntary.Voluntary;
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

    @EmbeddedId
    private Cpf cpf;

    @EmbeddedId
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
