package com.pfe.pfe.security.services;


import com.pfe.pfe.models.Comment;
import com.pfe.pfe.models.Post;
import com.pfe.pfe.models.User;
import com.pfe.pfe.repository.PostRepository;
import com.pfe.pfe.repository.UserRepository;
import com.pfe.pfe.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	@Autowired
	UserRepository userRepository;

	@Autowired
	PostRepository postRepository;

	@Autowired
	private PostService postService;

	@Override
	@Transactional
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findByUsername(username)
				.orElseThrow(() -> new UsernameNotFoundException("User Not Found ===> " + username));

		return UserDetailsImpl.build(user);
	}

	public void delete(final Long id) {
		System.out.println("I aaaaaaaaaaaaaaaaammmmmmmmmmm heeereeeeeeeee");
		Collection<Post> relatedPosts = postRepository.findAllByUserUser_id(id);
		System.out.println("size "+relatedPosts.size());
		if (relatedPosts.size() > 0) {
			for (Post post : relatedPosts) {
				System.out.println("post to delete "+post.toString());
				postService.delete(post.getId());
			}
		}
		this.userRepository.deleteById(id);
	}

}
