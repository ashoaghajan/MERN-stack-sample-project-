/// <reference types="react-scripts" />

// Post types
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

type PostAction =  {
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


// Auth types
type AuthAction =  {
    type: 'GET_USER',
    payload: Object
} | {
    type: 'SET_USER',
    payload: { result: any, token: string }
} | {
    type: 'LOGOUT',
    payload: Object
}

type signinUser = {
    email: string,
    password: string,
}

type signupUser = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
}


// Global types
type RootState = {
    posts: Post[],
    auth: {
        authData: any
    }
}

type Action = PostAction | AuthAction

type Dispatch = (action: Action) => any