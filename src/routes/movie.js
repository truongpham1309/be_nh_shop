import { Router } from "express";


import {
    index,
    show,
    store,
    update,
    destroy
} from '../controllers/movieController.js';

const movieRoute = Router();

movieRoute.get('/', index);
movieRoute.get('/:id', show);
movieRoute.post('/create', store);
movieRoute.put('/update/:id', update);
movieRoute.delete('/delete/:id', destroy);

export default movieRoute;