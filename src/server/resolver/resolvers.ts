import {v1} from "uuid";
import {Resolvers, Score, Team} from "../../graphql/generated/Resolver";
import {pointsCollection, teamCollection} from "../database/mongoClient";
import {mapDatabaseTeamToGraph} from "./converter/mapDatabaseTeamToGraph";
import {MongoTeam} from "../database/type/MongoTeam";
import {MongoPoints} from "../database/type/MongoPoints";
import {AuthenticationLevel} from "../../graphql/Context";
import {getTeam} from "./retriever/getTeam";
import {getTeamScore} from "./retriever/getTeamScore";

export const resolvers: Resolvers = {
    Query: {
        teams: async (): Promise<Team[]> => {
            return (await teamCollection.find({}).toArray())
                .map(mapDatabaseTeamToGraph);
        },
        team: async (_, { id }): Promise<Team | null>  => getTeam(id)
    },
    Team: {
        score: async (parent: Team): Promise<Score> => getTeamScore(parent.id)
    },
    Mutation: {
        addTeam: async (_, { teamName }, { authenticationLevel}): Promise<Team> => {
            if (authenticationLevel !== AuthenticationLevel.ADMIN) {
                throw new Error("Not authenticated");
            }

            const document: MongoTeam = {
                _id: v1(),
                name: teamName
            }

            const result = await teamCollection.insertOne(document);

            if (result.insertedId) {
                return getTeam(result.insertedId)
            }

            throw new Error("Error adding team")
        },
        deleteTeam: async (_, { id }, { authenticationLevel}): Promise<boolean> => {
            if (authenticationLevel !== AuthenticationLevel.ADMIN) {
                throw new Error("Not authenticated");
            }

            // Delete the team
            const result = await teamCollection.deleteOne({ _id: id });

            if (result.deletedCount <= 0) {
                throw new Error("No team with id " + id)
            }

            // Delete points for that team
            await pointsCollection.deleteMany({ team: id });

            return true;
        },
        addPoints: async (_, { teamId, adjustment, reason, timestamp }, { authenticationLevel}): Promise<Team> => {
            if (authenticationLevel !== AuthenticationLevel.ADMIN) {
                throw new Error("Not authenticated");
            }

            const document: MongoPoints = {
                _id: v1(),
                team: teamId,
                adjustment,
                reason,
                timestamp: timestamp ?? new Date().toISOString()
            }

            const result = await pointsCollection.insertOne(document)

            if (result.insertedId) {
                return getTeam(teamId)
            }

            throw new Error("Error adding points for team")
        },
        deletePoints: async (_, { id }, { authenticationLevel}): Promise<boolean> => {
            if (authenticationLevel !== AuthenticationLevel.ADMIN) {
                throw new Error("Not authenticated");
            }

            const result = await pointsCollection.deleteOne({ _id: id })

            return result.deletedCount > 0;
        },
    }
}