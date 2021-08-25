import { Router } from 'express';
import userController from '../../controllers/userController';
import Validate from '../../middlewares/Validate';
import inputChecker from '../../middlewares/inputError';

const userRoute = Router();
userRoute.get(
  '/',
  userController.requestUsers
);

userRoute.get(
  '/:id',
  userController.requestUser
);

userRoute.post(
  '/',
  Validate.userManage(),
  inputChecker,
  userController.updateUser
);

userRoute.post(
  '/createAccount',
  Validate.userManage(),
  inputChecker,
  userController.createAcount
);

userRoute.delete(
  '/remove/:id',
  inputChecker,
  userController.deleteUser
);

export default userRoute;
