import {MongoTeam} from "../../database/type/MongoTeam";
import {Team} from "../../../graphql/generated/Resolver";
import {colorFromString} from "../../util/colourFromString";

const mapDatabaseTeamToGraph = (mongoTeam: MongoTeam): Team => {
    const id = mongoTeam._id.toString();

    return {
        id,
        competitionId: mongoTeam.competitionId,
        name: mongoTeam.name,
        color: mongoTeam.color ?? colorFromString(id)
    };
};

export { mapDatabaseTeamToGraph }
