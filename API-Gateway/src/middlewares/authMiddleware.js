const jwt = require('jsonwebtoken')
const { encryptPassword, decryptPassword } = require('./passwordMiddleware');
const Response = require('../routes/response/response')
let response = new Response()
let noAuthRoutes = ['/login', 'createAccount']

const jwt_secret = "secret";

const createToken = (data, password) => {
    password = encryptPassword(password);
    return jwt.sign({...data, password}, jwt_secret);
}

let authentication = (req, res, next) => {

    for(let i = 0; i < noAuthRoutes.length; i++){
        if(req.path.indexOf(noAuthRoutes[i]) != -1){
            return next()
        }
    }

    let token = req.headers['authorization']
    if(token){
        jwt.verify(token, jwt_secret, (err, decoded) => {
            if(err){
                response.data.token = false
                response.status.statusCode = 498
                response.status.message = 'Failed To Authenticate'
                res.status(498).json(response)
            }
            req.user = {};
            req.user.address = decoded.address;  // this mostly siging transaction and unlocking account at top most middleware
            req.user.name = decoded.name; // this is to get public keys from blockchain
            req.user.pk_A = decoded.publickey; // for zkp purpose.
            req.user.password = decryptPassword(decoded.password); // decrypting password for unlocking account

            req.headers.name = decoded.name // used when call database microservice directly.
            req.headers.address = decoded.address;
            next()
        })
    }else{
      console.log("OH NO, NO TOKEN")
        response.data.token = false
        response.status.statusCode = 499
        response.status.message = 'No Token Provided'
        res.status(499).json(response)
    }
}

module.exports = {
    authentication,
    createToken
}
