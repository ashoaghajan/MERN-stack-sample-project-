import express from 'express';
import { get_data, post_data, patch_data, delete_data } from '../controllers/postController';
import PostMessage from '../models/postMessage';

const router = express.Router();

router.get('/', (req: any, res: any) => {
    get_data(res, PostMessage);
});

router.post('/', (req: any, res: any) => {
    post_data(req, res, PostMessage);
});

router.patch('/:id', (req: any, res: any) => {
    patch_data(req, res, PostMessage);
});

router.delete('/:id', (req: any, res: any) => {
    delete_data(req, res, PostMessage);
});

module.exports = router;