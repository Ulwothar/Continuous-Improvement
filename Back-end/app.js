import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import projectsRoutes from './routes/projects-routes';
import usersRoutes from './routes/users-routes';
import commentsRoutes from './routes/comments-routes';
import HttpError from './models/http-error';
import { error } from 'console';

dotenv.config();

const app = express();
const DB = process.env.DB_URI;

const connectionSettings = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

app.use((req, res, next) => {
  //res.setHeader('Access-Control-Allow-Origin', `${process.env.FE_URI}`);
  res.setHeader('Access-Control-Allow-Origin', `http://localhost:3000`);
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(bodyParser.json());

app.use('/api/projects', projectsRoutes); //projects

app.get('/', (req, res) => {
  res.send('Does it work?');
});

app.use('/api/users', usersRoutes); //user login

app.use('/api/comments', commentsRoutes); //reviewer comments

app.use((req, res, next) => {
  throw new HttpError('Could not find this route', 404);
});

app.use((req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occured!' });
});

mongoose
  .connect(DB, connectionSettings)
  .then(() => {
    app.listen(5000);
    console.log('Database connected!');
  })
  .catch((err) => {
    console.log(err);
  });
