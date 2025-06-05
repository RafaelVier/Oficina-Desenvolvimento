package com.oficina_dev.backend.services;

import com.oficina_dev.backend.dtos.State.StateResponseDto;
import com.oficina_dev.backend.exceptions.StateNotFoundException;
import com.oficina_dev.backend.mappers.StateMapper;
import com.oficina_dev.backend.models.State.State;
import com.oficina_dev.backend.repositories.StateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class StateService {

    @Autowired
    private StateRepository stateRepository;

    @Autowired
    private StateMapper stateMapper;

    private State findById(UUID id){
        return stateRepository.findById(id)
                .orElseThrow(StateNotFoundException::new);
    }


    public StateResponseDto getById(UUID id){
        State state = this.findById(id);
        return stateMapper.toResponse(state);
    }

}
