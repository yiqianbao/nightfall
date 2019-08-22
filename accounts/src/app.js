import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import account from './routes/account';
import accounts from './routes/accounts';

const app = express();

// cors & body parser middleware should come before any routes are handled
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/account', account);
app.use('/accounts', accounts);

// handle bad calls
app.use((req, res) => res.sendStatus(404));

export default app;
