package com.pfe.pfe.service;

import com.pfe.pfe.dto.DtoConverter.ToDtoConverter;
import com.pfe.pfe.dto.PostDto;
import com.pfe.pfe.exceptions.PostException;
import com.pfe.pfe.models.Comment;
import com.pfe.pfe.models.Post;
import com.pfe.pfe.repository.CommentRepository;
import com.pfe.pfe.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.stream.Collectors;

@Service
public class PostService {
    private final PostRepository postRepository;
    private final CommentRepository commentRepository;

    @Autowired
    public PostService(final PostRepository postRepository, final CommentRepository commentRepository) {
        this.postRepository = postRepository;
        this.commentRepository = commentRepository;
    }

    public PostDto create(final Post post) {
        System.out.println("poooooosssttttt "+post.toString()+"!");
        this.postRepository.save(post);
        return ToDtoConverter.postToDto(post);
    }

    public Collection<PostDto> getAll() {

        Collection<Post> posts = this.postRepository.findAllSortedByDateReverse();
        return posts.stream()
                .map(ToDtoConverter::postToDto)
                .collect(Collectors.toList());
    }

    public PostDto getById(final Long id) {
        Post post = this.postRepository.findById(id).orElseThrow(
                () -> new PostException("Can't get. Post not found!"));
        return ToDtoConverter.postToDto(post);
    }

    public Collection<PostDto> getAllPaginated(final Integer pageNumber) {
        Integer index = pageNumber - 1;
        Page<Post> posts = this.postRepository.findAll(PageRequest.of(index, 20));
        return posts.stream().map(ToDtoConverter::postToDto).collect(Collectors.toList());
    }


    public PostDto update(final Post post) {
        Post post1=this.postRepository.findById(post.getId()).orElseThrow(
                () -> new PostException("Can't update. Post not found!")
        );
        post1.setTitle(post.getTitle());
        post1.setContent(post.getContent());
        post1.setRatingPoints(post.getRatingPoints());
        this.postRepository.save(post1);
        return ToDtoConverter.postToDto(post1);
    }

    public void delete(final Long id) {
        Collection<Comment> relatedComments = commentRepository.findAllByPostId(id);
        if (relatedComments.size() > 0) {
            for (Comment comment : relatedComments) {
                commentRepository.deleteById(comment.getId());
            }
        }
        this.postRepository.deleteById(id);
    }


    public void rate(final Long id, final Integer rate) {
        Post foundPost = postRepository.findById(id).get();
        foundPost.setRatingPoints(rate);

        this.postRepository.save(foundPost);
    }

}
