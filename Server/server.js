//const express = require('express');
// const fetch = require('node-fetch');


//import Realm from "realm-web";
const express =  require("express");
//import ObjectId from "mongodb";

const path = require("path");
const fileURLToPath = require("url");

const {MongoClient} = require("mongodb");
const mongo = require("mongodb");
const uriPass = "replace";


const uri = `replace`;
const client = new MongoClient(uri);
const database = client.db("Bandwidth");
const itemsCollection = database.collection("Items");

const bodyParser = require("body-parser");

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const app = express();
const port = 5000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const APP_ID = "bandwidth-luesr";

// async function loginApiKey(apiKey) {
//     // Create an API Key credential
//     const credentials = Realm.Credentials.apiKey(apiKey);

//     // Authenticate the user
//     const user = await realmApp.logIn(credentials);

//     // `App.currentUser` updates to match the logged in user
//     console.assert(user.id === realmApp.currentUser.id);

//     return user;
// }

var apiKeyString; //"jSXSrzMf1cs4Sit0DNPIl8zOQSqFzUVQp3RqoRQoNSQbgVV6LaZydPfglUgSCrvU";

app.get('/', (req, res) => {
    apiKeyString = req.query.apiKey;
    res.sendFile("Website/index.html", { root: __dirname });
})

app.get('/getCSSFile', (req, res) => {
    res.sendFile("Website/app.css", { root: __dirname })
})

app.get('/getItems', (req, res) => {
    async function myFunction() {
        //const user = await loginApiKey(apiKeyString); // add previously generated API key
        //const mongo = realmApp.currentUser.mongoClient("mongodb-atlas");
        //const itemsCollection = mongo.db("Bandwidth").collection("Items");
        const items = itemsCollection.find();
        const itemArray = await items.toArray();
        console.log(itemArray);
        res.json(itemArray);
    }
    myFunction();
})

app.post('/addItem', (req, res) => {
    async function myFunction() {
        //const user = await loginApiKey(apiKeyString); // add previously generated API key
        //const mongo = realmApp.currentUser.mongoClient("mongodb-atlas");
        //const itemsCollection = mongo.db("Bandwidth").collection("Items");
    
        console.dir(req.body);
        const result = await itemsCollection.insertOne(req.body)
        console.log(result);
        res.json(result);
    }
    myFunction();
})

app.get('/delete', (req, res) => {
    async function myFunction(){
        let itemId = req.query.itemId;
        //const user = await loginApiKey(apiKeyString); // add previously generated API key
        //const mongo = realmApp.currentUser.mongoClient("mongodb-atlas");
        //const itemsCollection = mongo.db("Bandwidth").collection("Items");

        console.dir({"_id": `ObjectId('${itemId}')`});
        
        const result = await itemsCollection.deleteOne({_id: new mongo.ObjectId(itemId)});
        console.log(result);
        res.json(result);
    }
    myFunction();
})



app.listen(port, (error) => {
    if (!error)
        console.log("Server is Successfully Running, and App is listening on port " + port)
    else
        console.log("Error occurred, server can't start", error);
})