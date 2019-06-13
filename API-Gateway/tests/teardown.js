
const {databaseConfig} = require('./testData');
var MongoClient = require('mongodb').MongoClient;
var url = `mongodb://${databaseConfig.admin}:${databaseConfig.password}@${databaseConfig.host}:${databaseConfig.port}/${databaseConfig.databaseName}`; 

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.getCollectionNames().forEach(function(collName) {
    if (!collName.startsWith("system.")) {
        print("Dropping ["+dbName+"."+collName+"]");
        db[collName].drop();
        db.close();
    }
})
});