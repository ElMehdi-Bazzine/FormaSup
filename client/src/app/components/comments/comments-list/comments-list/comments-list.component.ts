import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from 'src/app/comment.service';
import { PostDetailsComponent } from 'src/app/components/posts/post-details/post-details/post-details.component';
import { AuthService } from 'src/app/_services/auth.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { Comment } from 'src/app/comment';

@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.css']
})
export class CommentsListComponent implements OnInit {
  currentUser: any;
  comments: Comment[] = [];
  isMine: boolean[] = [];
  isAdmin: boolean = false;

  constructor(private commentService: CommentService, private router: ActivatedRoute, private postDetailsComponent: PostDetailsComponent,
    private token: TokenStorageService, private authService: AuthService) {
  }

  ngOnInit() {
    this.currentUser = this.token.getUser();
    if (this.currentUser.roles[0] == "ROLE_ADMIN") { this.isAdmin = true; }
    console.log('id of actual post: ' + this.postDetailsComponent.id);
    this.isMine = [];
    this.commentService.getCommentsWithPostId(this.postDetailsComponent.id)
      .subscribe(
        (comments: any[]) => {
          console.log("id ", this.postDetailsComponent.id, "data", comments);
          this.comments = comments;
          this.comments.forEach(e => {
            console.log("user id is ", e.user.id, this.currentUser.id);
            if (e.user.user_id == this.currentUser.id) {
              this.isMine.push(true);
            }
            else { this.isMine.push(false); }
          });
          console.log('#######################: ', this.isMine);
        },
        (error) => console.log(error)
      );
  }

  onDeleteComment(id: number) {
    this.commentService.deleteComment(id);
    window.location.reload();

  }



}
