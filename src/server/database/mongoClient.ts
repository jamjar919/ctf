import {MongoClient, ServerApiVersion} from "mongodb";
import * as dotenv from "dotenv";
import {MongoTeam} from "./type/MongoTeam";
import {MongoPoints} from "./type/MongoPoints";

dotenv.config();

const mongoUri: string = process.env.DB_CONNECTION_STRING ?? '';
const mongoClient = new MongoClient(mongoUri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
const mongoDb = mongoClient.db("ctf");
const teamCollection = mongoDb.collection<MongoTeam>("team");
const pointsCollection = mongoDb.collection<MongoPoints>("points");

export { mongoClient, mongoDb, teamCollection, pointsCollection }