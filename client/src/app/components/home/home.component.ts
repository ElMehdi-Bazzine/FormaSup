import { Component, OnInit } from '@angular/core';
//import { UserService } from '../../_services/user.service';
import { TokenStorageService } from '../../_services/token-storage.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content: string;
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;
  form: any = {};
  msgerr = false;
  sucess = false;

  formation="";
 niveau ="";

  
  constructor(private authService: AuthService,private tokenStorageService: TokenStorageService,private router: Router,private https: HttpClient) { }

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');

      this.username = user.username;
    }
    
  }




  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  getformation(){
    if(this.formation==""){ alert("Veuillez taper votre formation/domaine recherché(e) !")}
    if(this.niveau==""){ alert("Veuillez selectionner un niveau d'étude souhaité!")}
    else{
      if(this.niveau=="licence"){
        this.router.navigate(["/formations",{formation:this.formation,niveau:this.niveau}]);
      }
      if(this.niveau=="master"){
        this.router.navigate(["/Master",{formation:this.formation,niveau:this.niveau}]);
      }
      if(this.niveau=="doctorat"){
        this.router.navigate(["/Doctorat",{formation:this.formation,niveau:this.niveau}]);
      }
   
  }
  
  }

}
