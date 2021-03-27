package com.pfe.pfe.controllers;

import com.pfe.pfe.dto.CommentDto;
import com.pfe.pfe.models.Comment;
import com.pfe.pfe.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@CrossOrigin(origins="http://localhost:4200")
@RestController
@RequestMapping("/api/comments")
public class CommentController {
    @Autowired
     CommentService commentService;




    @PostMapping
    public ResponseEntity<CommentDto> createComment(@RequestBody final Comment comment) {
        return new ResponseEntity<>(this.commentService.create(comment), HttpStatus.OK);
    }

    @GetMapping("/post/{id}")
    public ResponseEntity<Collection<CommentDto>> getCommentsByPostId(@PathVariable final Long id) {
        System.out.println();
        return new ResponseEntity<>(this.commentService.getAllByPostId(id), HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<CommentDto> updateComment(@RequestBody final Comment comment) {
        return new ResponseEntity<>(this.commentService.update(comment), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteCommentById(@PathVariable final Long id) {
        this.commentService.delete(id);
        return new ResponseEntity(HttpStatus.OK);
    }
}
