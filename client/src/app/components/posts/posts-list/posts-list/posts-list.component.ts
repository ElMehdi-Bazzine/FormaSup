import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/post';
import { PostService } from 'src/app/post.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {

  posts: Post[] = [];



  constructor(private postService: PostService, private authService: AuthService, private route: ActivatedRoute, private router: Router,) {
  }

  ngOnInit() {
    this.posts = [];
    this.postService.getPosts()
      .subscribe(
        (posts: any[]) => {
          this.posts = posts;
        },
        (error) => console.log(error)
      );
    //window.location.reload();


  }

}