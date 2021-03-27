package com.pfe.pfe.models;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
public class Post implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @NotNull
    @Size(min = 3, max = 40)
    private String title;


    @NotNull
    @Size(min = 5, max = 5000)
    @Column(columnDefinition = "TEXT")
    private String content;

    @NotNull
    private LocalDateTime dateTimeOfPost = LocalDateTime.now();


    @NotNull
    @Min(0)
    private Integer ratingPoints;

    @NotNull
    @ManyToOne(targetEntity=User.class,cascade = CascadeType.MERGE)
    @JoinColumn(foreignKey=@ForeignKey(name="user_id"))
    private User user;

    public Post() {
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

    public User getUser() {
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

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "Post{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", content='" + content + '\'' +
                ", dateTimeOfPost=" + dateTimeOfPost +
                ", ratingPoints=" + ratingPoints +
                ", user=" + user +
                '}';
    }
}
