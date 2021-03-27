package com.pfe.pfe.service;

import com.pfe.pfe.dto.CommentDto;
import com.pfe.pfe.models.Comment;

import java.util.List;

public interface CommentServiceInterface {
    public CommentDto create(final Comment comment);
    public List<CommentDto> getAllByPostId(final Long id);
    public CommentDto update(final Comment comment);
    public void delete(final Long id);

}
