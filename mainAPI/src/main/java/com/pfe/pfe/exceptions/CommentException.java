package com.pfe.pfe.exceptions;

public class CommentException extends RuntimeException {
    public CommentException(final String commentNotFound) {
        super(commentNotFound);
    }
}
