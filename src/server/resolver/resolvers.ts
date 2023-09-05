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
        addTeam: (_, { teamName }, { authenticationLevel}): Promise<Team> => {
            if (authenticationLevel !== AuthenticationLevel.ADMIN) {
                throw new Error("Not authenticated");
            }

            const document: MongoTeam = {
                _id: v1(),
                name: teamName
            }

            return teamCollection.insertOne(document)
                .then(result => {
                    if (result.insertedId) {
                        return getTeam(result.insertedId)
                    }

                    throw new Error("Error adding team")
                });
        },
        deleteTeam: (_, { id }, { authenticationLevel}): Promise<boolean> => {
            if (authenticationLevel !== AuthenticationLevel.ADMIN) {
                throw new Error("Not authenticated");
            }

            return teamCollection.deleteOne({ _id: id })
                .then((result) => {
                    return result.deletedCount > 0;
                });
        },
        addPoints: (_, { teamId, adjustment, reason, timestamp }, { authenticationLevel}): Promise<Team> => {
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

            return pointsCollection.insertOne(document)
                .then(result => {
                    if (result.insertedId) {
                        return getTeam(teamId)
                    }

                    throw new Error("Error adding team")
                });
        },
        deletePoints: (_, { id }, { authenticationLevel}): Promise<boolean> => {
            if (authenticationLevel !== AuthenticationLevel.ADMIN) {
                throw new Error("Not authenticated");
            }

            return pointsCollection.deleteOne({ _id: id })
                .then((result) => {
                    return result.deletedCount > 0;
                });
        },
    }
}