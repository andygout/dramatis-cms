import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import express from 'express';
import { engine } from 'express-handlebars';
import session from 'express-session';
import logger from 'morgan';
import favicon from 'serve-favicon';

import { errorHandler } from './middleware/index.js';
import apiRouter from './api-router.js';
import router from './router.js';

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '..', 'views'));

app.use(
	favicon(path.join(__dirname, 'assets', 'favicon.ico')), // Path is relative to `built/main.js`.
	logger('dev'),
	session({ secret: 'secret', resave: false, saveUninitialized: true }),
	express.static('public')
);

app.use('/api', apiRouter);

app.use(router);

app.use(errorHandler);

const port = '3001';

app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Listening on port ${port}`)); // eslint-disable-line no-console
