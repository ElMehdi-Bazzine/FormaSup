package com.pfe.pfe.service;

import com.pfe.pfe.dto.CommentDto;
import com.pfe.pfe.dto.DtoConverter.ToDtoConverter;
import com.pfe.pfe.exceptions.CommentException;
import com.pfe.pfe.models.Comment;
import com.pfe.pfe.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentService implements CommentServiceInterface{
    @Autowired
      CommentRepository commentRepository;


    @Override
    public CommentDto create(Comment comment) {
        this.commentRepository.save(comment);
        return ToDtoConverter.commentToDto(comment);
    }

    @Override
    public List<CommentDto> getAllByPostId(Long id) {
        Collection<Comment> foundComments = this.commentRepository.findAllByPostId(id);
        return foundComments.stream()
                .sorted(Comparator.comparing(Comment::getDateTimeOfComment).reversed())
                .map(ToDtoConverter::commentToDto)
                .collect(Collectors.toList());
    }

    @Override
    //@PreAuthorize("hasRole('USER')")
    public CommentDto update(Comment comment) {
        this.commentRepository.findById(comment.getId()).orElseThrow(
                () -> new CommentException("Can't update. Comment not found!")
        );
        this.commentRepository.save(comment);
        return ToDtoConverter.commentToDto(comment);
    }

    @Override
    //@PreAuthorize("hasRole('USER')")
    public void delete(Long id) {
        this.commentRepository.deleteById(id);
    }
}

