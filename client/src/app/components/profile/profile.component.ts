import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/user';
import { UserService } from 'src/app/user.service';

import { TokenStorageService } from '../../_services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  id: number;
  user:User;
  constructor(private token: TokenStorageService, private userService: UserService,private router: Router) { }

  ngOnInit() {
    this.user = new User();
    this.currentUser = this.token.getUser();
    this.id=this.currentUser.id;
    this.userService.getUser(this.id)
     .subscribe(data => {
       console.log(data)
       this.user = data;
       console.log("user ",this.user);
     }, error => console.log(error));

  }
  updateUser(user_id: number){
    this.router.navigate(['update', user_id]);
  }
}
