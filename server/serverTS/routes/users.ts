import express from 'express';
import { sign_in, sign_up } from '../controllers/userController';

const router = express.Router();


router.post('/signin', (req: any, res: any) => {
    const user = req.body;

    sign_in(user, res);
});

router.post('/signup', (req: any, res: any) => {
    const newUser = req.body;

    sign_up(newUser, res)
});


module.exports = router;