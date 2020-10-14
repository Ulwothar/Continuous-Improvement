import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import projectsRoutes from './routes/projects-routes';
import usersRoutes from './routes/users-routes';
import commentsRoutes from './routes/comments-routes';

dotenv.config();

const app = express();
// const DB = process.env.DB_URI;

// const connectionSettings = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', `${process.env.FE_URI}`);
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

app.use(bodyParser.json());

app.use('/api/projects', projectsRoutes); //projects

app.use('api/users', usersRoutes); //user login

app.use('/api/comments', commentsRoutes); //reviewer comments

app.listen(5000);
