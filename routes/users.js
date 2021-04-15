import { Router } from 'express';
import { 
    usersController,
    oneUserController,
    userRegistrationController,
    userLoginController,
    userUpdateController
} from '../controllers/users.js';

import isAuth from '../middlewares/auth.js';

const route = Router(); 

route.get('/', usersController);
route.get('/:id', oneUserController);
route.post('/create', userRegistrationController);
route.post('/login', userLoginController);
route.post('/update', isAuth, userUpdateController);

export default route;
