//import * as express from 'express';
import express, { request, response } from 'express';
import routes from './routes';
import path from 'path';
import cors from 'cors';

const app = express();  
//should put here the public domain in the future application 
app.use(cors());

app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')));

app.listen(3333);

