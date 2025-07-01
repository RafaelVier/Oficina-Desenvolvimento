package com.oficina_dev.backend.mappers;

import com.oficina_dev.backend.dtos.DonationItem.DonationItemRequestDto;
import com.oficina_dev.backend.dtos.DonationItem.DonationItemResponseDto;
import com.oficina_dev.backend.models.Donation;
import com.oficina_dev.backend.models.DonationItem;
import com.oficina_dev.backend.models.DonationItemId;
import com.oficina_dev.backend.models.Item;
import org.springframework.stereotype.Component;

@Component
public class DonationItemMapper {

    public DonationItemResponseDto toResponse(DonationItem donationItem) {
        return new DonationItemResponseDto(
                donationItem.getId().getDonationId(),
                donationItem.getId().getItemId(),
                donationItem.getQuantity()
        );
    }

    public DonationItem toEntity(DonationItemRequestDto donationItemRequestDto, Donation donation, Item item) {
        return new DonationItem(
                new DonationItemId(donation.getId(), item.getId()),
                donationItemRequestDto.getQuantity(),
                donation,
                item
        );
    }
}
