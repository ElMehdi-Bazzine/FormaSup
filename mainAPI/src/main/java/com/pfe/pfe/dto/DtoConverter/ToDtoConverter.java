package com.pfe.pfe.dto.DtoConverter;

import com.pfe.pfe.dto.CommentDto;
import com.pfe.pfe.dto.PostDto;
import com.pfe.pfe.dto.UserDto;
import com.pfe.pfe.models.Comment;
import com.pfe.pfe.models.Post;
import com.pfe.pfe.models.User;

public final class ToDtoConverter {

    public static CommentDto commentToDto(final Comment comment) {
        return new CommentDto(
                comment.getId(),
                comment.getContent(),
                comment.getDateTimeOfComment(),
                comment.getUser(),
                comment.getPost()
        );
    }

    public static PostDto postToDto(final Post post) {
        return new PostDto(
                post.getId(),
                post.getTitle(),
                post.getContent(),
                post.getDateTimeOfPost(),
                post.getRatingPoints(),
                userToDto(post.getUser())
        );
    }

    public static UserDto userToDto(final User user) {
        return new UserDto(
                user.getUser_id(),
                user.getUsername(),
                user.getEmail(),
                user.getPrenom(),
                user.getNom(),
                user.getRoles()
        );
    }

}
