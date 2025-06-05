package com.oficina_dev.backend.exceptions;

public class StateNotFoundException extends RuntimeException {

    public StateNotFoundException(String message) {
        super(message);
    }

    public StateNotFoundException() {
        super("State Not Found");
    }

}
