import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import webpackDevServer from './webpack/dev-server';
import routes from './routes';

dotenv.config({
  silent: true,
});

const app = express();

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'pug');

if (process.env.NODE_ENV !== 'production') {
  webpackDevServer(app);
}

app.use(logger('combined'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, './public')));

app.use('/', routes);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: app.get('env') === 'development' ? err : {},
  });
  next();
});

export default app;
