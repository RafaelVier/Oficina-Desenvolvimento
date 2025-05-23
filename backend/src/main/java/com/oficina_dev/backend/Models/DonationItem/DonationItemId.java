package com.oficina_dev.backend.Models.DonationItem;


import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@Embeddable
public class DonationItemId {

    @Column(name = "id_donation")
    private UUID donationId;

    @Column(name = "id_item")
    private UUID itemId;
}
