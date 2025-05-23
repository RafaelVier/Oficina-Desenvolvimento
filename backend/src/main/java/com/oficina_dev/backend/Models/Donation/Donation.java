package com.oficina_dev.backend.Models.Donation;

import com.oficina_dev.backend.Models.DonationItem.DonationItem;
import com.oficina_dev.backend.Models.Giver.Giver;
import com.oficina_dev.backend.Models.State.State;
import com.oficina_dev.backend.Models.Voluntary.Voluntary;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "tb_donations", schema = "public")
public class Donation {

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
    @JoinColumn(name = "id_giver")
    private Giver giver;

    @ManyToOne
    @JoinColumn(name = "id_voluntary")
    private Voluntary voluntary;

    @OneToMany(mappedBy = "donation")
    private List<DonationItem> donationItems;

}
