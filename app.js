const express = require('express');
const app = express();


app.get("/product-reviews", async (req, resp) => {
  var product_id = req.query.pid;
  console.info('product id' + product_id)
  try {

    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb+srv://taran:admin@1234@cluster0.ctdbd.mongodb.net/sample_airbnb?retryWrites=true&w=majority";
    
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("sample_airbnb");
      dbo.collection("listingsAndReviews").find({}, { projection: { _id: 1, name: 1, summary: 1 } }).limit(10).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        resp.send(result);
      });
    });
  }
  catch (error) {
    console.error('error logging--' + error);
  }
});

app.get("/product-reviews/:pid", async (req, resp) => {
  var product_id = req.params['pid'];
  console.info('product id' + product_id)
  try {

    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb+srv://taran:admin@1234@cluster0.ctdbd.mongodb.net/sample_airbnb?retryWrites=true&w=majority";
    
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("sample_airbnb");
      dbo.collection("listingsAndReviews").find({_id:product_id}, { projection: { _id: 1, name: 1, summary: 1 } }).limit(10).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        resp.send(result);
      });
    });
  }
  catch (error) {
    console.error('error logging--' + error);
  }
});

const port = 7000;
app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});

