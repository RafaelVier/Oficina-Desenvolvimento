package com.oficina_dev.backend.Models.ReceiverLimit;


import com.oficina_dev.backend.Models.Limit.Limit;
import com.oficina_dev.backend.Models.Receiver.Receiver;
import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.ZonedDateTime;

@Entity
@Table(name = "tb_receiver_limit", schema = "public")
public class ReceiverLimit {

    //Composting FK
    @EmbeddedId
    private ReceiverLimitId id;

    @Column(name = "caught_items", nullable = false)
    private Integer caughtItems;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private ZonedDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private ZonedDateTime updatedAt;

    @ManyToOne
    @MapsId("ReceiverId")
    @JoinColumn(name = "id_receiver")
    private Receiver receiver;

    @ManyToOne
    @MapsId("LimitId")
    @JoinColumn(name = "id_limit")
    private Limit limit;
}
