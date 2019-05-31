/****************************************************************************
*                      index.js
* This is the rest API for the Authentication  microservice, which provides
* Authentication and AUthorisation from  the Blockchain

*****************************************************************************/

import rootRouter from './routes/api-gateway';
import tokenRoutes from './routes/token';
import coinRoutes from './routes/coin';
import ftRoutes from './routes/ft';
import nftRoutes from './routes/nft';
import userRoutes from './routes/user';
import shieldRoutes from './routes/shield';

var express = require('express');
var app = express();
const router = express.Router();
var bodyParser = require('body-parser');
const proxy = require('express-http-proxy');

const config = require('./config/config'); // require the config file
config.setEnv(process.env.NODE_ENV);
const Config = require('./config/config').getProps(); //get the properties of environment

const logger = require('./logger');

const cors = require('cors'); // cors is used to allow cross origin requests
const {
  authentication,
} = require('./middlewares/authMiddleware'); /* Authorization filter used to verify Role of the user */
const { unlockAccount } = require('./middlewares/passwordMiddleware');

app.use(bodyParser.json()); // set up a filter to parse JSON

app.use(cors()); // cross origin filter
app.use(authentication);

app.use('/zkp', unlockAccount, proxy(Config.zkp.app.host + ':' + Config.zkp.app.port));
app.use('/database', proxy(Config.database.host + ':' + Config.database.port));
app.use(
  '/offchain-service',
  unlockAccount,
  proxy(Config.offchain.app.host + ':' + Config.offchain.app.port),
);
app.use('/', unlockAccount, router);
app.use('/', rootRouter);
app.use('/token', tokenRoutes);
app.use('/coin', coinRoutes);
app.use('/ft', ftRoutes);
app.use('/nft', nftRoutes);
app.use('/user', userRoutes);
app.use('/shield', shieldRoutes);

// handle bad calls
app.use(function(req, res) {
  res.status(404).send({ url: req.originalUrl + ' not found' });
});

app.use(function(err, req, res, next) {
  logger.error(
    `${req.method}:${req.url}
		${JSON.stringify({ error: err.message })}
		${JSON.stringify({ body: req.body })}
		${JSON.stringify({ params: req.params })}
		${JSON.stringify({ query: req.query })}
	`,
  );
});

//handle unhandled promise rejects
process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at:', p, 'reason:', reason);
});

const server = app.listen(80, '0.0.0.0', function() {
  logger.info('API-Gateway API server running on port 80');
});

server.setTimeout(120*60*1000);