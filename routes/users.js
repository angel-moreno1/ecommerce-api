import { Router } from 'express';
import { 
    usersMiddleware,
    oneUserMiddleware
} from '../middleware/users.js';

const route = Router(); 

route.get('/', usersMiddleware);
route.get('/:id', oneUserMiddleware);

export default route;
