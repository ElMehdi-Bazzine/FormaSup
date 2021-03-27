import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { UserService } from "../../user.service";
import { Router } from '@angular/router';
import { User } from "../../user";
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-allusers',
  templateUrl: './allusers.component.html',
  styleUrls: ['./allusers.component.css']
})
export class AllusersComponent implements OnInit {

  users: User[];
  isAdmin:boolean[]=[];
  currentUser: any;

  constructor(private userService: UserService,
    private token: TokenStorageService,
    private router: Router) {}

  ngOnInit() {
    this.currentUser = this.token.getUser();
    this.reloadData();
  }

  reloadData() {
    this.userService.getUsers().subscribe((data:User[])=> {
      this.users=data;
      this.users.forEach(e=>{
        if (e.user_id == this.currentUser.id) {
          this.isAdmin.push(true);
        }
        else { this.isAdmin.push(false); }
      });
    })
   
  }

  deleteUser(user_id: number) {
    this.userService.deleteUser(user_id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  userDetails(user_id: number){
    this.router.navigate(['userdetail', user_id]);
  }
  updateUser(user_id: number){
    this.router.navigate(['update', user_id]);
  }
  

}
