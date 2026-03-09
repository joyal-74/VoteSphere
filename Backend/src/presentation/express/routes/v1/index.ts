import router from "../userRoutes";
import userRoutes from '../../routes/userRoutes'
import authRoutes from '../../routes/authRoutes'

router.use('/user', userRoutes);
router.use('/auth', authRoutes);

export default router;