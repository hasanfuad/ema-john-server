const express = require('express')
const app = express()
const cors = require('cors');

const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

const port = 5000;

require('dotenv').config()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.shttn.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const productCollection = client.db("emajohnStore").collection("products");

client.connect(err => {
   
app.post('/addProducts', (req, res) => {
    const products = req.body;
    productCollection.insertMany(products)
    .then(result => {
      console.log(result);
      res.send(result)
    })
})
});






//default code
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})