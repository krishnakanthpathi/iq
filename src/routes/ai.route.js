import { Router } from 'express';
import  ai_controller  from '../controllers/ai.controller.js';


const ai_route = Router();

ai_route.post('/solve', ai_controller.ai_solve);
// ai_route.post('/decription', ai_controller);


export default ai_route;

