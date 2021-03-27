import {User} from "./user";

export class Post {
    id: number;
    title: string;
    content: string;
    dateTimeOfPost: Date;
    ratingPoints: number;
    user: User;

    constructor(title: string, content: string, user: User) {
        this.title = title;
        this.content = content;
        this.ratingPoints = 0;
        this.user = user;
    }
}