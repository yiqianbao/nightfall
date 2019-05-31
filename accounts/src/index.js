import app from './app';
import web3 from './web3';

/**
 * Bootstrap the application. Start express.
 */
const main = async () => {
  try {
    web3.connect();

    app.listen(80);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

main();
