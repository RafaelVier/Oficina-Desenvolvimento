package com.oficina_dev.backend.models.TransferDonationItem;


import com.oficina_dev.backend.models.Item.Item;
import com.oficina_dev.backend.models.TransferDonation.TransferDonation;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.ZonedDateTime;

@Entity
@Table(name = "tb_transfer_donation_items", schema = "public")
public class TransferDonationItem {

    @EmbeddedId
    private TransferDonationItemId id;

    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private ZonedDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private ZonedDateTime updatedAt;

    @ManyToOne
    @MapsId("itemId")
    @JoinColumn(name = "id_item")
    private Item item;

    @ManyToOne
    @MapsId("transferDonationId")
    @JoinColumn(name = "id_transfer_donation")
    private TransferDonation transferDonation;

}
