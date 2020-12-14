export const postReducer = (state: Post[] = [], action: Action) => {
    switch(action.type){
        case 'GET_POSTS':
            return action.payload

        case 'CREATE_POST':
            return [action.payload, ...state]

        case 'UPDATE_POST':
            const updatedPosts = state.map(post => post._id === action.payload._id ? action.payload : post);
            return updatedPosts

        case 'DELETE_POST':
            const filteredPosts = state.filter(post => post._id !== action.payload._id);
            return filteredPosts    

        default:
            return state;
    }
}