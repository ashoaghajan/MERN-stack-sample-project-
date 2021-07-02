const initState = {
    posts: [],
    post: null,
    currentPage: 1,
    totalPageNumber: 1,
    loading: false
};

export const postReducer = (state = initState, action: Action) => {
    switch(action.type){
        case 'GET_POSTS':
            const { data: posts, currentPage, totalPageNumber } = action.payload;
            return {
                ...state,
                posts,
                currentPage,
                totalPageNumber
            }

        case 'GET_SINGLE_POST':
            return {
                ...state,
                post: action.payload
            }    

        case 'GET_POSTS_BY_SEARCH': 
            return {
                ...state,
                posts: action.payload.data
            }
        case 'CREATE_POST':
            return {
                ...state,
                posts: [action.payload, ...state.posts]
            }

        case 'UPDATE_POSTS':
            const updatedPosts = state.posts.map((post: Post) => post._id === action.payload._id ? action.payload : post);
            return {
                ...state,
                posts: updatedPosts
            }

        case 'UPDATE_SINGLE_POST':
            return {
                ...state,
                post: action.payload
            }

        case 'DELETE_POST':
            const filteredPosts = state.posts.filter((post: Post) => post._id !== action.payload._id);
            return {
                ...state,
                posts: filteredPosts
            }  
            
        case 'START_LOADING':
            return {
                ...state,
                loading: true
            }  
            
        case 'END_LOADING':
            return {
                ...state,
                loading: false
            } 

        default:
            return state;
    }
}