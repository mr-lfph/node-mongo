const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');//to get request(post) from postman 
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();



const app = express();
app.use(cors());
app.use(bodyParser.json());


//const dbUser=process.env.DB_USER;
//const pass=process.env.DB_PASS;
//const uri = `mongodb+srv://${dbUser}:${pass}@cluster0-q4h9m.mongodb.net/test?retryWrites=true&w=majority`;
const uri=process.env.DB_PATH;
const client = new MongoClient(uri, { useNewUrlParser: true });

//const rootCall=(req,res)=>res.send('Thank you');
//app.get('/',)
const users = ["Tanvir", "Munifa", "Muniruzzaman", "Tahim"];
const data = [
    {
        name: 'Munifa',
        job: 'Doctor',
        salary: 100000,
        company: {
            name: 'Square Hospital',
            website: 'www.Square.com.bd',
            address: 'Dhaka bangladesh'
        }
    },
    {
        name: 'Tahim',
        job: 'Architecture',
        salary: 100000,
    }
]

app.get('/products', (req, res) => {
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("onlineStore").collection("products");
        //find({name:'Mobile'})
        collection.find().limit(10).toArray((err, documents) => {

            if (err) {
                console.log(err);
                res.status(500).send({message:err});
            }
            else {
                res.send(documents);
            }
        });
        client.close();
    });
});
app.get('/fruits/banana', (req, res) => {
    res.send({ fruit: 'Banana', quantity: 100, price: 1000 })
})

app.get('/users/:id', (req, res) => {
    const Id = req.params.id;
    //console.log(req.query.sort);

    const name = users[Id];
    res.send({ Id, name });
})

app.post('/addProduct', (req, res) => {
    const product = req.body;
    const client = new MongoClient(uri, { useNewUrlParser: true });
    client.connect(err => {
        const collection = client.db("onlineStore").collection("products");
        // collection.insertOne(product, (err, result) => {
        collection.insert(product, (err, result) => {

            if (err) {
                console.log(err);
                res.status(500).send({message:err});
            }
            else {
                res.send(result.ops[0]);
            }
        });
        client.close();
    });


})
const port=process.env.PORT || 4200;
app.listen(port, () => console.log('Listening to port 4200 nodemon'));


