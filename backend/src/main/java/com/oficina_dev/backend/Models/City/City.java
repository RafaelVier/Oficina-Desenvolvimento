package com.oficina_dev.backend.Models.City;

import com.oficina_dev.backend.Models.State.State;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.ZonedDateTime;
import java.util.UUID;

@Entity
@Table(name = "tb_cities", schema = "public")
public class City {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "name", length = 100, nullable = false, unique = true)
    private String name;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private ZonedDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private ZonedDateTime updatedAt;

    //Relacionamento muitos pra um, Fk state dentro da tabela city
    @ManyToOne
    @JoinColumn(name = "id_state")
    private State state;

    //TODO:Criar relacionamento OneToMany, city -> address
}
