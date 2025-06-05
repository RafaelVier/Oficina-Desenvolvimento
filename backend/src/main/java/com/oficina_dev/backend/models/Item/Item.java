package com.oficina_dev.backend.models.Item;


import com.oficina_dev.backend.models.Category.Category;
import com.oficina_dev.backend.models.DonationItem.DonationItem;
import com.oficina_dev.backend.models.Size.Size;
import com.oficina_dev.backend.models.TransferDonationItem.TransferDonationItem;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "tb_items", schema = "public")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "name", length = 100, nullable = false)
    private String name;

    @Column(name = "sex", length = 1, nullable = false)
    private String sex;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private ZonedDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private ZonedDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name = "id_category")
    private Category category;

    @ManyToOne
    @JoinColumn(name = "id_size")
    private Size size;

    @OneToMany(mappedBy = "item")
    private List<DonationItem> donationItems;

    @OneToMany(mappedBy = "item")
    private List<TransferDonationItem> transferDonationItems;
}
