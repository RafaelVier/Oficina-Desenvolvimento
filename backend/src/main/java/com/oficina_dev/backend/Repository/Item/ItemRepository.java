package com.oficina_dev.backend.Repository.Item;

import com.oficina_dev.backend.Models.Item.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ItemRepository extends JpaRepository<Item, UUID> {
}