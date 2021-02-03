import express from 'express';
import { sign_in, sign_up } from '../controllers/userController';

const router = express.Router();


router.post('/signin', (req: any, res: any) => sign_in(req, res));

router.post('/signup', (req: any, res: any) => sign_up(req, res));


module.exports = router;