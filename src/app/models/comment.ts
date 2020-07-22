import { User } from './user';

export interface Comment {
    id: number,
    authorId: number,
    author: User,
    text: string,
    anonymous: boolean,
    postId: number,
    creationDate:string
}
