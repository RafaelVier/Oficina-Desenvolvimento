package com.oficina_dev.backend.models.Receiver;

import com.oficina_dev.backend.models.Person.Person;
import com.oficina_dev.backend.models.ReceiverLimit.ReceiverLimit;
import com.oficina_dev.backend.models.TransferDonation.TransferDonation;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "tb_receivers", schema = "public")
public class Receiver {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "nif", length = 100, nullable = false, unique = true)
    private String nif;

    @Column(name = "is_fit", nullable = false)
    private Boolean isFit;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private ZonedDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private ZonedDateTime updatedAt;

    @OneToOne
    @JoinColumn(name = "id_person", referencedColumnName = "id")
    private Person person;

    @OneToMany(mappedBy = "receiver")
    private List<ReceiverLimit> receiverLimits;

    @OneToMany(mappedBy = "receiver")
    private List<TransferDonation> transferDonations;
}
