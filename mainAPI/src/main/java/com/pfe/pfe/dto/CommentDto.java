package com.pfe.pfe.dto;

import com.pfe.pfe.models.Post;
import com.pfe.pfe.models.User;

import java.time.LocalDateTime;

public class CommentDto {
    private Long id;

    private String content;

    private LocalDateTime dateTimeOfComment;

    private User user;

    private Post post;

    public CommentDto() {
    }

    public CommentDto(Long id, String content, LocalDateTime dateTimeOfComment, User user, Post post) {
        this.id = id;
        this.content = content;
        this.dateTimeOfComment = dateTimeOfComment;
        this.user = user;
        this.post = post;
    }

    public Long getId() {
        return id;
    }

    public String getContent() {
        return content;
    }

    public LocalDateTime getDateTimeOfComment() {
        return dateTimeOfComment;
    }

    public User getUser() {
        return user;
    }

    public Post getPost() {
        return post;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setDateTimeOfComment(LocalDateTime dateTimeOfComment) {
        this.dateTimeOfComment = dateTimeOfComment;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setPost(Post post) {
        this.post = post;
    }
}
