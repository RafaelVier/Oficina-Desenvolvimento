package com.oficina_dev.backend.models.TransferDonation;

import com.oficina_dev.backend.models.Receiver.Receiver;
import com.oficina_dev.backend.models.TransferDonationItem.TransferDonationItem;
import com.oficina_dev.backend.models.Voluntary.Voluntary;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Getter
@Entity
@NoArgsConstructor
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

    public TransferDonation(Receiver receiver, Voluntary voluntary) {
        this.receiver = receiver;
        this.voluntary = voluntary;
        this.transferDonationItems = new ArrayList<>();
    }

    public void addTransferDonationItem(TransferDonationItem item) {
        item.setTransferDonation(this);
        this.transferDonationItems.add(item);
    }
}
