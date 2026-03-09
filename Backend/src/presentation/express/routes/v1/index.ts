import router from "../userRoutes.js";
import userRoutes from '../../routes/userRoutes.js'
import authRoutes from '../../routes/authRoutes.js'

router.use('/user', userRoutes);
router.use('/auth', authRoutes);

export default router;