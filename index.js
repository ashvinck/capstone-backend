import express from "express"; // "type": "module"
import * as dotenv from 'dotenv';
import { MongoClient } from "mongodb";
import cors from "cors";


dotenv.config();  //env configuration
const app = express(); // using express js

const MONGO_URL = process.env.MONGO_URL //URL to connect to MONGODB
const PORT = process.env.PORT;


// Mongo DB configuration
async function createConnection() {
    const client = new MongoClient(MONGO_URL);
    await client.connect(); //connecting to DB
    console.log("Mongo is connected ✌😊");
    return client;
}

export const client = await createConnection();

app.use(cors()); //for enabling cors across all ip
app.use(express.json()); //to convert to JSON


// API For Posting the data to the Database
app.post("/avatar", express.json(), async function (request, response) {
    const data = request.body;
    console.log(data)
    const moviedata = await client.db("Avatar").collection("avatardata").insertMany(data);
    response.send(moviedata);
})

// API for getting the data from the Database
app.get("/avatar", async function (request, response) {
    const moviedata = await client.db("Avatar").collection("avatardata").find({}).toArray();
    response.send(moviedata);
})

// To check whether connection is established
app.get("/", function (request, response) {
    response.send("🙋‍♂️, 🌏 🎊✨🤩");
});

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`)); //for console logging connection status
