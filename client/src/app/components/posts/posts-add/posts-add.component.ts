import {Component, NgModule, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {PostService} from "../../../post.service";
import {Post} from "../../../post";
import { ActivatedRoute, Router } from '@angular/router';
//import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {UserService} from "../../../user.service";
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-posts-add',
  templateUrl: './posts-add.component.html',
  styleUrls: ['./posts-add.component.css']
})

export class PostsAddComponent implements OnInit {

  @ViewChild('f') addPostForm: NgForm;
     id: number;
     currentUser: any;
   

    constructor(private postService: PostService, private userService: UserService, private route: ActivatedRoute,private router: Router,private token : TokenStorageService ) {
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
     }, error => console.log(error));
   }

    onAddPost() {
        const value = this.addPostForm.value;
        const newPost = new Post(value.title, value.content, this.currentUser);
        console.log("post ",newPost);
        this.postService.savePost(newPost);
        this.router.navigate(['/postslist']);
    }


}
