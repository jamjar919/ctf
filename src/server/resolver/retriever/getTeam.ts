import {MongoTeam} from "../../database/type/MongoTeam";
import {teamCollection} from "../../database/mongoClient";
import {mapDatabaseTeamToGraph} from "../converter/mapDatabaseTeamToGraph";
import {Team} from "../../../graphql/generated/Resolver";

const getTeam = async (id: string): Promise<Team> => {
    const maybeTeam: MongoTeam | null = await teamCollection.findOne({ _id: id });

    if (maybeTeam == null) {
        throw new Error(`No team found with id ${id}`);
    }

    return mapDatabaseTeamToGraph(maybeTeam);
}

export { getTeam }