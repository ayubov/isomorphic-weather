import path from 'path';
import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import { renderServerSide } from './renderServerSide';

const { PUBLIC_URL = '' } = process.env;

export const app = express();

app.use(compression());
app.use(helmet());
app.use(bodyParser.json());

app.use(
  PUBLIC_URL,
  express.static(path.resolve(__dirname, '../build'))
);

app.use(
  PUBLIC_URL,
  express.static(path.resolve(__dirname, '../public'))
);

app.use(morgan('tiny')); // logger

app.use(renderServerSide);
