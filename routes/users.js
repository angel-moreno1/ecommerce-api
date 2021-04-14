import { Router } from 'express';
import { 
    usersController,
    oneUserController
} from '../controllers/users.js';

const route = Router(); 

route.get('/', usersController);
route.get('/:id', oneUserController);

export default route;
