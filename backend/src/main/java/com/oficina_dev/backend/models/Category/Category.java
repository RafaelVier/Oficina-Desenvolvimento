package com.oficina_dev.backend.models.Category;


import com.oficina_dev.backend.models.Item.Item;
import jakarta.persistence.*;
import lombok.Getter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

@Getter
@Entity
@Table(name = "tb_categories", schema = "public")
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "name", length = 100, nullable = false, unique = true)
    private String name;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private ZonedDateTime creatAt;

    @UpdateTimestamp
    @Column(name = "update_at")
    private ZonedDateTime updateAt;

    @OneToMany(mappedBy = "category")
    private List<Item> items;
}
