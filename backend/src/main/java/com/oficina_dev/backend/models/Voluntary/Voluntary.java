package com.oficina_dev.backend.models.Voluntary;

import com.oficina_dev.backend.models.Donation.Donation;
import com.oficina_dev.backend.models.Person.Person;
import com.oficina_dev.backend.models.TransferDonation.TransferDonation;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "tb_voluntaries")
public class Voluntary {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private ZonedDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private ZonedDateTime updatedAt;

    @OneToOne
    @JoinColumn(name = "id_person", referencedColumnName = "id")
    private Person person;

    @OneToMany(mappedBy = "voluntary")
    private List<Donation> donations;

    @OneToMany(mappedBy = "voluntary")
    private List<TransferDonation> transferDonations;
}
