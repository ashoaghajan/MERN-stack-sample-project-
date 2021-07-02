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
    likes: string[],
    comments: string[]
}

type PostAction =  {
    type: 'GET_POSTS',
    payload: {
        data: Post[],
        currentPage: number,
        totalPageNumber: number
    }
} | {
    type: 'GET_SINGLE_POST',
    payload: {
        data: Post
    }
} | {
    type: 'UPDATE_SINGLE_POST',
    payload: {
        data: Post
    }
} | {
    type: 'GET_POSTS_BY_SEARCH',
    payload: {
        data: Post[]
    }
} | {
    type: 'CREATE_POST',
    payload: Post
} | {
    type: 'UPDATE_POSTS',
    payload: Post
} | {
    type: 'DELETE_POST',
    payload: Post
} | {
    type: 'START_LOADING'
} | {
    type: 'END_LOADING'
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


// Search
type SearchQuery = {
    search: string,
    tags: string
}

// Global types
type RootState = {
    posts: {
        posts: Post[],
        post: Post
        currentPage: number,
        totalPageNumber: number,
        loading: boolean
    },
    auth: {
        authData: any
    }
}

type Action = PostAction | AuthAction

type Dispatch = (action: Action) => any