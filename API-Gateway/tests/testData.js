module.exports = {
    domainName: 'http://api-test.nightfall.docker',
    aliceDetails: { name: "alice", email: "alice@ey.com", password: "pass", pk:"",sk:"", token:"", address: ""},
    bobDetails:{ name: "bob", email: "bob@ey.com", password: "pass", pk:"",sk:"", token:"", address:"" },
    ft:{
       mintAmount: 1000,
       transferAmount:100,
       burnAmount:50
    },
    nft:{
        tokenUriOne: 'widget01',
        tokenUriTwo: 'widget02',
        tokenUriThree:'widget03'
     },
     ft_commitment:{
        mintTokenOne: 10,
        mintTokenTwo: 20,
        transferAmount:15,
        burnAmount:15
     },
    databaseConfig:{
        host: 'nightfall_mongo_1',
        port: "27017",
        databaseName: "nightfall",
        admin: "admin",
        password: "admin"
    },
}
