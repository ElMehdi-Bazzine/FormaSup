import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Post } from 'src/app/post';
import { PostService } from 'src/app/post.service';

import { AuthService } from 'src/app/_services/auth.service';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
    selector: 'app-post-details',
    templateUrl: './post-details.component.html',
    styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
    post = {} as Post;
    id: number;
    allowRate = true;
    author = "";
    isAuthenticated: boolean = false;
    currentUser: any;
    isAdmin: boolean = false;


    constructor(private postService: PostService, private route: ActivatedRoute, private router: Router, private authService: AuthService, private token: TokenStorageService) {
    }

    ngOnInit() {
        this.currentUser = this.token.getUser();
        if (this.currentUser.roles[0] == "ROLE_ADMIN") { this.isAdmin = true; }
        console.log("Cccccccccccccccccccccccccuser ", this.currentUser);
        this.route.params.subscribe(
            (params: Params) => {
                this.id = +params['id'];
                this.postService.getPostById(this.id)
                    .subscribe(
                        (data: Post) => {
                            this.post = data;
                            this.author = data.user.username;
                            console.log('subscribe ', this.post);
                            console.log("posttttttttttttttttttt ", this.post.user)
                            if (this.post.user.id == this.currentUser.id) {
                                this.isAuthenticated = true;
                                console.log('hola ', this.isAuthenticated)
                            }
                        },
                        (error) => console.log(error)
                    );
            }
        );


    }

    onRate(buttonState: number) {
        this.allowRate = false;
        if (buttonState == 0) {
            if (this.post.ratingPoints > 0)
                this.post.ratingPoints -= 1;
        } else if (buttonState == 1) {
            this.post.ratingPoints += 1;
        }

        this.postService.changeRatingPoints(this.id, this.post.ratingPoints);
    }

    onDeletePost() {
        this.postService.deletePost(this.id);
        this.router.navigate(['postslist']);

    }



}
