package com.oficina_dev.backend.models.Address;

import com.oficina_dev.backend.models.City.City;
import com.oficina_dev.backend.models.Person.Person;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.ZonedDateTime;
import java.util.UUID;

@Entity
@Table(name = "tb_address", schema = "public")
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "number")
    private Integer number;

    @Column(name = "street", length = 100)
    private String street;

    @Column(name = "neighborhood", length = 100)
    private String neighborhood;

    @Column(name = "complement", length = 100)
    private String complement;

    @Column(name = "reference_point", length = 100, nullable = false)
    private String referencePoint;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private ZonedDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private ZonedDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name = "id_city")
    private City city;

    @OneToOne(mappedBy = "address")
    private Person person;
}
