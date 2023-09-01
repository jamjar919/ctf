import {MongoTeam} from "../../database/type/MongoTeam";
import {Team} from "../../../graphql/generated/Resolver";

const mapDatabaseTeamToGraph = (mongoTeam: MongoTeam): Team => {
    return {
        id: mongoTeam._id.toString(),
        name: mongoTeam.name
    };
};

export { mapDatabaseTeamToGraph }
