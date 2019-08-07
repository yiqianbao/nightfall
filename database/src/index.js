/* eslint-disable import/no-commonjs */
/* eslint-disable func-names */

const express = require('express');

const app = express();
const router = express.Router();
const bodyParser = require('body-parser');

const cors = require('cors');

const logger = require('./logger');

const setDB = require('./middlewares/setDBMiddleware');
const dbConnection = require('./middlewares/dbConnectionMiddleware');

const accountRouter = require('../src/routes/accounts.routes');
const tokenRouter = require('../src/routes/token.routes');
const coinRouter = require('../src/routes/coin.routes');

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(dbConnection);
app.use(setDB);
app.use('/', router);

accountRouter.init(router);
tokenRouter.init(router);
coinRouter.init(router);

app.use(function(err, req, res, next) {
  logger.error(
    `${req.method}:${req.url}
		${JSON.stringify({ error: err.message })}
		${JSON.stringify({ body: req.body })}
		${JSON.stringify({ params: req.params })}
		${JSON.stringify({ query: req.query })}
	`,
  );
  res
    .status(err.status || 500)
    .send({ hasError: true, statusCode: err.status, message: err.message, error: err });

  next(err);
});

const server = app.listen(80, '0.0.0.0', function() {
  console.log('zkp database RESTful API server started on ::: 80');
});
server.timeout = 0;
