import express from 'express';
import {
    get_data,
    post_data,
    patch_data,
    delete_data,
    like_data,
    get_post_by_search,
    get_single_data
} from '../controllers/postController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();


router.get('/', get_data);

router.get('/:id', get_single_data);

router.get('/search', get_post_by_search);

router.post('/', authMiddleware, post_data);

router.delete('/:id', authMiddleware, delete_data);

router.patch('/:id', authMiddleware, patch_data);

router.patch('/:id/like', authMiddleware, like_data);


module.exports = router;