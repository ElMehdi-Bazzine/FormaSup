import {Injectable} from "@angular/core";
import {Post} from "./post";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
//import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private  baseUrl = 'http://localhost:8080/api/posts/';


    constructor(private http: HttpClient) {

    }

    getPosts() {
        return this.http.get(`${this.baseUrl}`);
    }

    getPostsByPage(pageNumber: number) {
        return this.http.get(`${this.baseUrl+'page/'}`  + pageNumber);
    }
/*
 savePost(newPost: Post): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, newPost);
  }
  */
    savePost(newPost: Post) {
        return this.http.post(`${this.baseUrl+'add'}`, newPost).subscribe(
            (response: Response) => {
                console.log(response);
            }
        );
    }

    getPostById(id: number) {
        return this.http.get(`${this.baseUrl}` +id);
    }

    

    changeRatingPoints(id: number, rate: number) {
        console.log("changeRatingPoints: id:" + id + " buttonState: " + rate);
        return this.http.put(`${this.baseUrl}`+ id + "/rate", rate).subscribe(
            (response: Response) => {
                console.log(response);
            }
        );
    }

    deletePost(id: number) {
        this.http.delete(`${this.baseUrl}` + id).subscribe(
            () => {
                console.log('Deleted post with id: ' + id);
            }
        );
    }

    updatePost(updatedPost: Post) {
        return this.http.put(`${this.baseUrl}`, updatedPost).subscribe(
            (response: Response) => {
                console.log(response);
            
            }
        )
    }

    searchPost(searchData: string) {
        return this.http.get("/api/posts/search?q=" + searchData)
    }
}