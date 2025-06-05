package com.oficina_dev.backend.controllers.rest;

import com.oficina_dev.backend.exceptions.StateNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(StateNotFoundException.class)
    public ResponseEntity<RestErrorMessage> stateNotFoundHandler(StateNotFoundException exception){
        RestErrorMessage errorMessage = new RestErrorMessage(
                HttpStatus.INTERNAL_SERVER_ERROR, exception.getMessage()
        );
        return ResponseEntity.status(errorMessage.httpStatus()).body(errorMessage);
    }

}
