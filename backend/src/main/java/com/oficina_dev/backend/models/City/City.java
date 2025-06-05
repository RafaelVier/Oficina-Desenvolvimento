package com.oficina_dev.backend.models.City;

import com.oficina_dev.backend.models.Address.Address;
import com.oficina_dev.backend.models.State.State;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.ZonedDateTime;
import java.util.List;
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

    @OneToMany(mappedBy = "city")
    private List<Address> addresses;
}
