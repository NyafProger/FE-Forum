import { Comment } from './comment';
import { User } from './user';

export interface Post {
    
    id: number,
    title: string,
    text: string,
    author: User,
    anonymous: boolean,
    comments: Comment,
    creationDate:string
}

