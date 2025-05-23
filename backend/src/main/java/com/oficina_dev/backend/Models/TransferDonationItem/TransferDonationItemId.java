package com.oficina_dev.backend.Models.TransferDonationItem;


import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@Embeddable
public class TransferDonationItemId {

    @Column(name = "id_transfer_donation")
    private UUID transferDonationId;

    @Column(name = "id_item")
    private UUID itemId;
}
