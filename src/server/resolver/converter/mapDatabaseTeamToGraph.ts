import {MongoTeam} from "../../database/type/MongoTeam";
import {Team} from "../../../graphql/generated/Resolver";
import {colorFromString} from "../../util/ColourFromString";

const mapDatabaseTeamToGraph = (mongoTeam: MongoTeam): Team => {
    const id = mongoTeam._id.toString();

    return {
        id,
        name: mongoTeam.name,
        color: mongoTeam.color ?? colorFromString(id)
    };
};

export { mapDatabaseTeamToGraph }
