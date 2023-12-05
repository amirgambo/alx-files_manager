/**
 * Server with express
 */
import express from 'express';
import startServer from './library/boot';
import injectRoutes from './routes';
import injectMiddlewares from './library/middlewares';

const server = express();

injectMiddlewares(server);
injectRoutes(server);
startServer(server);

export default server;
