package com.oficina_dev.backend.exceptions;

public class CategoryNotFoundException extends RuntimeException {

    public CategoryNotFoundException(String message) {
        super(message);
    }

    public CategoryNotFoundException() { super("State Not Found"); }
}
