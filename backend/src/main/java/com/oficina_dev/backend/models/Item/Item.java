package com.oficina_dev.backend.models.Item;


import com.oficina_dev.backend.models.Category.Category;
import com.oficina_dev.backend.models.DonationItem.DonationItem;
import com.oficina_dev.backend.models.Size.Size;
import com.oficina_dev.backend.models.TransferDonationItem.TransferDonationItem;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

@Getter
@Entity
@NoArgsConstructor
@Table(name = "tb_items", schema = "public")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "name", length = 100, nullable = false)
    private String name;

    @Column(name = "sex", length = 1, nullable = false)
    private char sex;

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

    public Item(String name, char sex, Category category, Size size) {
        this.setName(name);
        this.setSex(sex);

    }

    public void setSex(char sex) {
        char validSex = Character.toLowerCase(sex);
        if (validSex != 'm' && validSex != 'f') {
            throw new IllegalArgumentException("Sex must be 'm' or 'f'");
        }
        this.sex = validSex;
    }

    public void setName(String name) {
        this.name = name.toLowerCase().trim();
    }


}
