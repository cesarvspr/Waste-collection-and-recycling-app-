import express, {request, response} from 'express';
import PointsController from './controllers/PointController';
import ItemsController from "./controllers/ItemController";

const routes = express.Router();
const pointController = new PointsController();
const itemController = new ItemsController();

routes.get('/items', itemController.index);

routes.get('/points', pointController.index)
routes.get('/points/:id', pointController.show);
routes.post('/points', pointController.create);

export default routes;