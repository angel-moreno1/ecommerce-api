import { Router } from 'express';
import { 
    usersController,
    oneUserController,
    userRegistrationController
} from '../controllers/users.js';

const route = Router(); 

route.get('/', usersController);
route.get('/:id', oneUserController);
route.post('/create', userRegistrationController);

export default route;
