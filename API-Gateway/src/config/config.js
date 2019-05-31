let env = 'LOCAL' //set the environment to local if not mentioned while starting the app
const props = {
    LOCAL: {
        HASHLENGTH: 8, //expected length of a hash in bytes
        accounts: {
            app: {
                host: 'http://accounts',
                port: "80"
            },
            rpc: {
                host: 'http://ganache',
                port: "8545"
            }
        },
        authenticationApi: {
            app: {
                host: 'http://api',
                port: "80"
            },
            rpc: {
                host: 'http://ganache',
                port: "8545"
            }
        },
        zkp: {
            app: {
                host: 'http://zkp',
                port: "80"
            },
            rpc: {
                host: 'http://localhost',
                port: "8545"
            }
        },
        database: {
            host: 'http://database',
            port: "80"
        },
        offchain: {
            app: {
                host: 'http://offchain',
                port: "80"
            },
            rpc: {
                host: 'http://ganache',
                port: "8545"
            }
        },
        enable_logger: true
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
