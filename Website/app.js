import * as Realm from "realm-web";
const {
  BSON: { ObjectId },
} = Realm;

const APP_ID = "bandwidth-luesr";
// Add your App ID
const app = new Realm.App({ id: APP_ID });

const credentials = Realm.Credentials.apiKey("656d62fc9c8430e18ac4d5b7");

const user = await app.logIn(credentials);

console.assert(user.id === app.currentUser.id);

const mongo = app.currentUser.mongoClient("mongodb-atlas");
const items = mongo.db("Bandwidth").collection("Items");

const queryResult = items.find();
queryResult.forEach(query => console.log(query));

function getItems(){
    var wrapper = document.getElementById("wrapper");
    var items = mongo.get();
    items.forEach(item => {
        addItemToList(wrapper, item);
    });
}

function addItemToList(wrapper, item){
    wrapper.appendChild(item);
}