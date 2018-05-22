import path from 'path';
import express from 'express';
import routes from './routes';

const app = express();

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'pug');

app.use('/', routes);

export default app;
