import { v1 } from "uuid";
import {Points, Resolvers, Score, Team} from "../../graphql/generated/Resolver";
import {pointsCollection, teamCollection} from "../database/mongoClient";
import {mapDatabaseTeamToGraph} from "./converter/mapDatabaseTeamToGraph";
import {mapDatabasePointsToGraph} from "./converter/mapDatabasePointsToGraph";
import {MongoTeam} from "../database/type/MongoTeam";
import {MongoPoints} from "../database/type/MongoPoints";

export const resolvers: Resolvers = {
    Query: {
        teams: async (): Promise<Team[]> => {
            return (await teamCollection.find({}).toArray())
                .map(mapDatabaseTeamToGraph);
        },
        team: async (_, { id }): Promise<Team | null>  => {
            const maybeTeam: MongoTeam | null = await teamCollection.findOne({ _id: id });

            if (maybeTeam == null) {
                return null;
            }

            return mapDatabaseTeamToGraph(maybeTeam);
        }
    },
    Team: {
        score: async (parent: Team): Promise<Score> => {
            const teamId = parent.id;

            const points: Points[] = (await pointsCollection.find({ team: teamId }).toArray())
                .map(mapDatabasePointsToGraph);

            const total = points.reduce((a, b) => a + b.adjustment, 0);

            return {
                points,
                total
            }
        }
    },
    Mutation: {
        addTeam: (_, { teamName }): Promise<boolean> => {
            const document: MongoTeam = {
                _id: v1(),
                name: teamName
            }

            return teamCollection.insertOne(document)
                .then(result => {
                    return !!result.insertedId;
                })
        },
        deleteTeam: (_, { id }): Promise<boolean> => {
            return teamCollection.deleteOne({ _id: id })
                .then((result) => {
                    return result.deletedCount > 0;
                });
        },
        addPoints: (_, { teamId, adjustment, reason, timestamp }): Promise<boolean> => {
            const document: MongoPoints = {
                _id: v1(),
                team: teamId,
                adjustment,
                reason,
                timestamp: timestamp ?? new Date().toISOString()
            }

            return pointsCollection.insertOne(document)
                .then(result => {
                    return !!result.insertedId;
                })
        },
        deletePoints: (_, { id }): Promise<boolean> => {
            return pointsCollection.deleteOne({ _id: id })
                .then((result) => {
                    return result.deletedCount > 0;
                });
        },
    }
}