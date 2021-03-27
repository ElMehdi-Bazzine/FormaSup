import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Post } from 'src/app/post';
import { PostService } from 'src/app/post.service';

import { UserService } from 'src/app/user.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
  @ViewChild('f') addPostForm: NgForm;
  editedPost = {} as Post;
  id: number;
  isSend: boolean;
  currentUser: any;

  constructor(private postService: PostService, private userService: UserService, private route: ActivatedRoute, private router: Router,private token : TokenStorageService ) {
  }

  ngOnInit() {
    this.currentUser = this.token.getUser();
    this.id=this.currentUser.id;
      this.isSend = false;
      this.route.params.subscribe(
          (params: Params) => {
              this.id = +params['id'];
              this.postService.getPostById(this.id)
                  .subscribe(
                      (data: Post) => {
                          this.editedPost = data;
                          this.currentUser = data.user;
                          console.log(this.editedPost);
                      },
                      (error) => console.log(error)
                  );
          }
      );
  }

  onEditPost() {
    
      const value = this.addPostForm.value;
      let updatedPost:Post = new Post(value.title.toString(),value.content.toString(),this.currentUser);

      updatedPost.id = this.id;
      updatedPost.ratingPoints = this.editedPost.ratingPoints;

      console.log('updated post:' + updatedPost);
     
          this.postService.updatePost(updatedPost);
      
      this.isSend = true;
      this.router.navigate(['postslist']);
  }
}
