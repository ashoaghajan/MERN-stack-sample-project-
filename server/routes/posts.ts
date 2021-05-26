import express from 'express';
import {
    get_data,
    post_data,
    patch_data,
    delete_data,
    like_data
} from '../controllers/postController';
import { authMiddleware } from '../middleware/auth';

const router = express.Router();


router.get('/', (req: any, res: any) => get_data(res));

router.post('/', authMiddleware, (req: any, res: any) => post_data(req, res));

router.delete('/:id', authMiddleware, (req: any, res: any) => delete_data(req, res));

router.patch('/:id', authMiddleware, (req: any, res: any) => patch_data(req, res));

router.patch('/:id/like', authMiddleware, (req: any, res: any) => like_data(req, res));


module.exports = router;