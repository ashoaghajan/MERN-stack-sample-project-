import express from 'express';
import { get_data, post_data, patch_data, delete_data } from '../controllers/postController';
import PostMessage from '../models/postMessage';

const router = express.Router();

router.get('/', (req: any, res: any) => {
    get_data(res);
});

router.post('/', (req: any, res: any) => {
    const { body } = req;
    const postToAdd = new PostMessage(body);

    post_data(postToAdd, res);
});

router.patch('/:id', (req: any, res: any) => {
    const  { id: _id } = req.params;
    const { body } = req;

    patch_data(_id, body, res);
});

router.delete('/:id', (req: any, res: any) => {
    const  { id: _id } = req.params;

    delete_data(_id, res;
});

module.exports = router;