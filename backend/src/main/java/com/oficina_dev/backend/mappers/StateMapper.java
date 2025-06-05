package com.oficina_dev.backend.mappers;

import com.oficina_dev.backend.dtos.State.StateResponseDto;
import com.oficina_dev.backend.models.State.State;
import org.springframework.stereotype.Component;

@Component
public class StateMapper {

    public StateResponseDto toResponse(State state){
        return new StateResponseDto(
                state.getId(), state.getName(), state.getAbbreviation()
        );
    };
}
