var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url,{useNewUrlParser:true, useUnifiedTopology: true }, function(err, db) {
  if (err) throw err;
  var dbo = db.db("Node");
  dbo.collection("details").find().toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});