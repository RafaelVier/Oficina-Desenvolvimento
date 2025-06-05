package com.oficina_dev.backend.models.TransferDonation;

import com.oficina_dev.backend.models.Receiver.Receiver;
import com.oficina_dev.backend.models.TransferDonationItem.TransferDonationItem;
import com.oficina_dev.backend.models.Voluntary.Voluntary;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "tb_transfers", schema = "public")
public class TransferDonation {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private ZonedDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private ZonedDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name = "id_receiver")
    private Receiver receiver;

    @ManyToOne
    @JoinColumn(name = "id_voluntary")
    private Voluntary voluntary;

    @OneToMany(mappedBy = "transferDonation")
    private List<TransferDonationItem> transferDonationItems;
}
