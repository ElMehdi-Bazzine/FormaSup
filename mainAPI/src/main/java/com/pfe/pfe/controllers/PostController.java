package com.pfe.pfe.controllers;

import com.pfe.pfe.dto.PostDto;
import com.pfe.pfe.models.Post;
import com.pfe.pfe.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;

@CrossOrigin(origins="http://localhost:4200")
@RestController
@RequestMapping("/api/posts")
public class PostController {

    private final PostService postService;

    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }

    @PostMapping("/add")
    public ResponseEntity<PostDto> createPost(@RequestBody final Post post) {
        return new ResponseEntity<>(this.postService.create(post), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<Collection<PostDto>> getAllPosts() {
        return new ResponseEntity<>(this.postService.getAll(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostDto> getPostById(@PathVariable final Long id) {
        return new ResponseEntity<>(this.postService.getById(id), HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<PostDto> updatePost(@RequestBody final Post post) {
        return new ResponseEntity<>(this.postService.update(post), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deletePostById(@PathVariable final Long id) {
        this.postService.delete(id);
        return new ResponseEntity(HttpStatus.OK);
    }


    @PutMapping("/{id}/rate")
    public ResponseEntity<PostDto> ratePost(@PathVariable final Long id, @RequestBody final Integer buttonState) {
        this.postService.rate(id, buttonState);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/page/{pageNumber}")
    public ResponseEntity<Collection<PostDto>> getPostsPaginated(@PathVariable final Integer pageNumber) {
        return new ResponseEntity<>(this.postService.getAllPaginated(pageNumber), HttpStatus.OK);
    }


}