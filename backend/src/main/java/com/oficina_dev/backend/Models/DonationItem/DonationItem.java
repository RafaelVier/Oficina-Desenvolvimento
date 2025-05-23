package com.oficina_dev.backend.Models.DonationItem;


import com.oficina_dev.backend.Models.Donation.Donation;
import com.oficina_dev.backend.Models.Item.Item;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.ZonedDateTime;


@Entity
@Table(name = "tb_donation_items", schema = "public")
public class DonationItem {

    //Composting FK
    @EmbeddedId
    private DonationItemId id;

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
    @MapsId("donationId")
    @JoinColumn(name = "id_donation")
    private Donation donation;
}
