import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AllusersComponent } from './components/allusers/allusers.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UpdateComponent } from './components/update/update.component';
import { UserdetailComponent } from './components/userdetail/userdetail.component';
import {PostsAddComponent} from "./components/posts/posts-add/posts-add.component";
import { PostsListComponent } from './components/posts/posts-list/posts-list/posts-list.component';
import { PostDetailsComponent } from './components/posts/post-details/post-details/post-details.component';
import { PostEditComponent } from './components/posts/post-edit/post-edit/post-edit.component';
import { FormationComponent } from './components/formation/formation.component';
import { MasterComponent } from './components/formation/master/master.component';
import { DortoratComponent } from './components/formation/dortorat/dortorat.component';
const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"home",component:HomeComponent},
  { path:"register", component: RegisterComponent },
  { path:"login", component: LoginComponent },
  { path:"allusers", component: AllusersComponent },
  {path: 'posts', component: PostsAddComponent},
  { path:"profile", component: ProfileComponent },
  { path:"update/:id", component: UpdateComponent },
  { path:"userdetail/:id", component: UserdetailComponent },
  {path: 'postslist', component: PostsListComponent},
  {path: 'posts/:id', component: PostDetailsComponent},
  {path: 'posts/:id', component: PostDetailsComponent},
  {path: 'posts/edit/:id', component: PostEditComponent},
  {path: "formations",component:FormationComponent},
  {path: "Master",component:MasterComponent},
  {path: "Doctorat",component:DortoratComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
