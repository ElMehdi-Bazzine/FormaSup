import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/user';
import { UserService } from 'src/app/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.css']
})
export class UserdetailComponent implements OnInit {
  id:number;
  user:User;
  constructor(private userService: UserService,
    private router: Router,private route: ActivatedRoute) {}
  
    ngOnInit() {
      this.user=new User();
      this.id = this.route.snapshot.params['id'];
      
      this.userService.getUser(this.id)
        .subscribe(data => {
          console.log(data)
          this.user = data;
        }, error => console.log(error));
    }
  
    list(){
      this.router.navigate(['allusers']);
    }
  

}
