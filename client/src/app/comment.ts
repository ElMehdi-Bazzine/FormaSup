import { Post } from "./post";
import { User } from "./user";

export class Comment {
    id: number;
    content: string;
    dateTimeOfComment: Date;
    user: User;
    post: Post;

    constructor(content: string, user: User, post: Post) {
        this.content = content;
        this.user = user;
        this.post = post;
    }
}