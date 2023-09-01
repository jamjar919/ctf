import {Points, Resolvers, Team} from "../../graphql/generated/Resolver";
import {pointsCollection, teamCollection} from "../database/mongoClient";
import {mapDatabaseTeamToGraph} from "./converter/mapDatabaseTeamToGraph";
import {mapDatabasePointsToGraph} from "./converter/mapDatabasePointsToGraph";

export const resolvers: Resolvers = {
    Query: {
        teams: async () => {
            return (await teamCollection.find({}).toArray())
                .map(mapDatabaseTeamToGraph);
        },
    },
    Team: {
        points: async (parent: Team): Promise<Points[]> => {
            const teamId = parent.id;

            return (await pointsCollection.find({ team: teamId }).toArray())
                .map(mapDatabasePointsToGraph);
        },
    }
}