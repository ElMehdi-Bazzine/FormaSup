import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { Comment } from "./comment";


@Injectable()
export class CommentService {
    private  baseUrl = 'http://localhost:8080/api/comments';
    constructor(private http: HttpClient) {
    }

    saveComment(newComment: Comment) {
        return this.http.post(`${this.baseUrl}`, newComment).subscribe(
            (response: Response) => {
                console.log(response);
            }
        );
    }

    getCommentsWithPostId(id: number) {
        return this.http.get(`${this.baseUrl}`+"/post/" + id);
    }

    deleteComment(id: number) {
        this.http.delete(`${this.baseUrl}` + "/"+id).subscribe(
            () => {
                console.log('Deleted comment with id: ' + id);
            }
        )
    }
}