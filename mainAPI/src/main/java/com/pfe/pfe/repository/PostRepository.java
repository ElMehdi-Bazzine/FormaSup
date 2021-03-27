package com.pfe.pfe.repository;

import com.pfe.pfe.models.Comment;
import com.pfe.pfe.models.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    @Query("from Post p order by p.dateTimeOfPost desc")
    Collection<Post> findAllSortedByDateReverse();

    Post findFirstByOrderByIdDesc();
    @Query("from Post p order by p.dateTimeOfPost desc")
    Page<Post> findAll( Pageable pageable);

    @Query("from Post p where p.user.user_id = :user_id")
    Collection<Post> findAllByUserUser_id(long user_id);

}
