import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AllusersComponent } from './components/allusers/allusers.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UpdateComponent } from './components/update/update.component';
import { UserdetailComponent } from './components/userdetail/userdetail.component';
import { authInterceptorProviders } from './_helper/auth.interceptor.service';
import { PostsComponent } from './components/posts/posts.component';
import { PostsAddComponent } from './components/posts/posts-add/posts-add.component';
import { PostsListComponent } from './components/posts/posts-list/posts-list/posts-list.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PostDetailsComponent } from './components/posts/post-details/post-details/post-details.component';
import { PostEditComponent } from './components/posts/post-edit/post-edit/post-edit.component';
import { CommentsComponent } from './components/comments/comments.component';
import { CommentAddComponent } from './components/comments/comment-add/comment-add/comment-add.component';
import { CommentService } from './comment.service';
import { CommentsListComponent } from './components/comments/comments-list/comments-list/comments-list.component';
import { FormationComponent } from './components/formation/formation.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { MasterComponent } from './components/formation/master/master.component';
import { DortoratComponent } from './components/formation/dortorat/dortorat.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    
    RegisterComponent,
    HeaderComponent,
    LoginComponent,
    
    AllusersComponent,
    
    ProfileComponent,
    
    UpdateComponent,
    
    UserdetailComponent,
    
    PostsComponent,
    
    PostsAddComponent,
    PostsListComponent,
    PostDetailsComponent,
    PostEditComponent,
    CommentsComponent,
    CommentAddComponent,
    CommentsListComponent,
    FormationComponent,
    MasterComponent,
    DortoratComponent,
   
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    CommonModule

  ],
  providers: [authInterceptorProviders,CommentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
