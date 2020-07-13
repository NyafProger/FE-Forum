export interface Comment {
    id: number,
    authorId: number,
    text: string,
    anonymous: boolean,
    postId: number,
    creationDate:string
}
