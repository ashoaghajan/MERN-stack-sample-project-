import React, { useEffect } from 'react';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from '../styles/paginationStyle';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { checkToken } from '../global/globalFunctions';
import { getPosts } from '../actions/postActions';

export interface PaginateProps {
    page: number
}
 
const Paginate: React.SFC<PaginateProps> = ({ page }) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const userData: User = useSelector((state: RootState) => state.auth.authData);
    const { totalPageNumber, currentPage } = useSelector((state: RootState) => state.posts);
    const history = useHistory();
    const token = userData.token ? userData.token : '';

    useEffect(() => {
        if(page){
            checkToken(token, dispatch, history);
            dispatch(getPosts(page));
        }
        // eslint-disable-next-line
    },[page]);
    

    return ( 
        <Pagination 
            classes={{ ul: classes.ul }} 
            count={totalPageNumber} 
            page={Number(currentPage) || 1} 
            variant='outlined' 
            color="primary" 
            renderItem={item => (
                <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`}/>
            )} 
        />
     );
}
 
export default Paginate;

