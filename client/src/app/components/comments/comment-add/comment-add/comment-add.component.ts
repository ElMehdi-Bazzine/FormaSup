import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentService } from 'src/app/comment.service';
import { Post } from 'src/app/post';
import { PostService } from 'src/app/post.service';
import { User } from 'src/app/user';
import { UserService } from 'src/app/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { PostDetailsComponent } from 'src/app/components/posts/post-details/post-details/post-details.component';
import {Comment} from  'src/app/comment';

@Component({
  selector: 'app-comment-add',
  templateUrl: './comment-add.component.html',
  styleUrls: ['./comment-add.component.css']
})
export class CommentAddComponent implements OnInit {
  @ViewChild('f') addCommentForm: NgForm;
  post = {} as Post;
  id: number;
  currentUser = {} as User;
  isAuthenticated: boolean = false;

  constructor(private commentService: CommentService, private postService: PostService, private userService: UserService, private router: ActivatedRoute,
              private postDetailsComponent: PostDetailsComponent, private route: Router,private authService: AuthService,private token : TokenStorageService ) {
  }

  ngOnInit() {
    this.currentUser = this.token.getUser();

    // this.id = this.route.snapshot.params['id'];
    this.id=this.currentUser.id;
     console.log("id ",this.id);
     
     this.userService.getUser(this.id)
       .subscribe(data => {
         console.log(data)
         this.currentUser = data;
         console.log("user ",this.currentUser);
         this.isAuthenticated = true;

       }, error => console.log(error));
  }

  onAddComment() {
      const value = this.addCommentForm.value;
      const newComment = new Comment(value.content, this.currentUser, this.postDetailsComponent.post);
      console.log(this.postDetailsComponent.post);
      this.commentService.saveComment(newComment);
      //this.route.navigate(['/postslist']);
      window.location.reload();


  }

}
