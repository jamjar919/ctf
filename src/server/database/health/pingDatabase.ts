import {mongoClient} from "../mongoClient";
import {getIp} from "../../util/getIp";

/**
 * Simple ping check to check the DB works ok, throws an error if it doesn't
 */
const pingDatabase = () => {
    console.log("Connecting to database...")

    getIp()
        .then(ip => console.log(`📞 IP: ${ip}`));

    return mongoClient
        .connect()
        .then(() => mongoClient.db("admin").command({ ping: 1 })) // Ping
        .then(() => console.log("📡 Connected to MongoDB"))
        .catch((e) => console.error("🚫📡 No DB connection", e))
}

export { pingDatabase }