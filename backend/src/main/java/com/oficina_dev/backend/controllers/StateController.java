package com.oficina_dev.backend.controllers;

import com.oficina_dev.backend.dtos.State.StateResponseDto;
import com.oficina_dev.backend.services.StateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/state")
public class StateController {

    @Autowired
    private StateService stateService;

    @GetMapping("/{id}")
    public ResponseEntity<StateResponseDto> getById(@PathVariable UUID id){
        StateResponseDto stateResponseDto = stateService.getById(id);
        return ResponseEntity.ok(stateResponseDto);
    }

}
