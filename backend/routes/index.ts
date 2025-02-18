import {Router} from 'express'
import testRoutes from './test.route';
import userRoutes from './user.route';

const router = Router()

router.use('/test', testRoutes);
router.use('/user', userRoutes);

export default router;
