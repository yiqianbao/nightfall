module.exports = {
    domainName:"http://api.nightfall.docker",
    aliceDetails: { name: "alice", email: "alice@ey.com", password: "pass" },
    bobDetails:{ name: "bob", email: "bob@ey.com", password: "pass" },
    databaseConfig:{
        host: 'database.nightfall.docker',
        port: "27017",
        databaseName: "nightfall",
        admin: "admin",
        password: "admin"
    }
}