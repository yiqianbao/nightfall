/**
@module config.js
@author Liju Jose
@desc constants used by a nubmer of other modules
*/

/* eslint-disable import/no-commonjs */


let env = 'local' //set the environment to local if not mentioned while starting the app
const props = {
  local: {
    app: {
      host: 'http://database',
      port: "80"
    },
    mongo: {
      host: 'mongo',
      port: "27017",
      databaseName: "nightfall",
      admin: "admin",
      password: "admin"
    },
    enable_logger: true,
    crypt_secret: "secret" // used for encrypt and dercypt user other accounts password. [used in utils/crypto.js]
  },
}

/**
 * Set the environment
 * @param { string } environment - environment of app
 */
let setEnv = (environment) => {
    if(props[environment]){
        env = environment
    }
}

/**
 * get the appropriate environment config
 */
let getProps = () => {
    return props[env]
}

module.exports = {
    setEnv,
    getProps
}
