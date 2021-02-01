/// <reference types="react-scripts" />

// Post types
type PostToAdd = {
    name: string,
    creator: string,
    title: string,
    message: string,
    tags: string[],
    selectedFile: string,
}

type Post = {
    name: string,
    creator: string,
    title: string,
    message: string,
    tags: string[],
    selectedFile: string,
    _id: string,
    createdAt: Date,
    likeCount: number,
    likes: string[]
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
type User = {
    token: string,
    result: {
        email: string,
        name: string,
        _id?: string
        googleId: string
        imageUrl: string
    }
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


// Global types
type RootState = {
    posts: Post[],
    auth: {
        authData: any
    }
}

type Action = PostAction | AuthAction

type Dispatch = (action: Action) => any