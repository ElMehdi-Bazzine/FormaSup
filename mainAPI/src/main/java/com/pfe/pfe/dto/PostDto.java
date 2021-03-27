package com.pfe.pfe.dto;

import java.time.LocalDateTime;

public class PostDto {
    private Long id;

    private String title;

    private String content;

    private LocalDateTime dateTimeOfPost;

    private Integer ratingPoints;

    private UserDto user;

    public PostDto() {
    }

    public PostDto(Long id, String title, String content, LocalDateTime dateTimeOfPost, Integer ratingPoints, UserDto user) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.dateTimeOfPost = dateTimeOfPost;
        this.ratingPoints = ratingPoints;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

    public LocalDateTime getDateTimeOfPost() {
        return dateTimeOfPost;
    }

    public Integer getRatingPoints() {
        return ratingPoints;
    }

    public UserDto getUser() {
        return user;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setDateTimeOfPost(LocalDateTime dateTimeOfPost) {
        this.dateTimeOfPost = dateTimeOfPost;
    }

    public void setRatingPoints(Integer ratingPoints) {
        this.ratingPoints = ratingPoints;
    }

    public void setUser(UserDto user) {
        this.user = user;
    }
}
