package com.pfe.pfe.models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
@Entity
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 2, max = 500)
    @Column(columnDefinition = "TEXT")
    private String content;

    @NotNull
    private LocalDateTime dateTimeOfComment = LocalDateTime.now();

    @NotNull
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    private User user;

    @NotNull
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    private Post post;

    public Comment() {
    }

    public Comment(Long id, @NotNull @Size(min = 2, max = 500) String content, @NotNull LocalDateTime dateTimeOfComment, @NotNull User user, @NotNull Post post) {
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

