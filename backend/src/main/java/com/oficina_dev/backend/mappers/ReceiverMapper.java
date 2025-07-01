package com.oficina_dev.backend.mappers;

import com.oficina_dev.backend.dtos.Receiver.ReceiverRequestDto;
import com.oficina_dev.backend.dtos.Receiver.ReceiverResponseDto;
import com.oficina_dev.backend.models.Person;
import com.oficina_dev.backend.models.Receiver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ReceiverMapper {
    @Autowired
    private PersonMapper personMapper;

    @Autowired
    private ReceiverLimitMapper receiverLimitMapper;

    public Receiver toEntity(ReceiverRequestDto receiverRequestDto, Person person) {
        return new Receiver(
                receiverRequestDto.getNif(),
                receiverRequestDto.getIsFit(),
                person
        );
    }

    public ReceiverResponseDto toResponse(Receiver receiver) {
        return new ReceiverResponseDto(
                receiver.getId(),
                this.personMapper.toResponse(receiver.getPerson()),
                receiver.getNif(),
                receiver.getIsFit()
        );
    }


    public void update(Receiver receiver, ReceiverRequestDto receiverRequestDto, Person person) {
        receiver.setNif(receiverRequestDto.getNif());
        receiver.setFit(receiverRequestDto.getIsFit());
        receiver.setPerson(person);

    }

    public void patch(Receiver receiver, ReceiverRequestDto receiverRequestDto, Person person) {
        if (receiverRequestDto.getIsFit() != null) {
            receiver.setFit(receiverRequestDto.getIsFit());
        }

        if (receiverRequestDto.getNif() != null) {
            receiver.setNif(receiverRequestDto.getNif());
        }

        if (receiverRequestDto.getPersonId() != null) {
            receiver.setPerson(person);
        }

    }

}