/// <reference types="react-scripts" />

type PostToAdd = {
    creator: string,
    title: string,
    message: string,
    tags: string[],
    selectedFile: string
}

type Post = {
    creator: string,
    title: string,
    message: string,
    tags: string[],
    selectedFile: string,
    _id: string,
    createdAt: Date,
    likeCount: number
}

type RootState = {
    posts: Post[]
}

type Action = {
    type: 'GET_POSTS',
    payload: Post[]
} | {
    type: 'CREATE_POST',
    payload: Post
} | {
    type: 'UPDATE_POST',
    payload: Post
} | {
    type: 'DELETE_POST',
    payload: Post
}

type Dispatch = (action: Action) => any