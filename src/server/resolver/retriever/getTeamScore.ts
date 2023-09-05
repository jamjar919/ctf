import {Points, Score} from "../../../graphql/generated/Resolver";
import {pointsCollection} from "../../database/mongoClient";
import {mapDatabasePointsToGraph} from "../converter/mapDatabasePointsToGraph";

const getTeamScore = async (id: string): Promise<Score> => {
    const points: Points[] = (await pointsCollection.find({ team: id }).toArray())
        .map(mapDatabasePointsToGraph);

    const total = points.reduce((a, b) => a + b.adjustment, 0);

    return {
        points,
        total
    }
}

export { getTeamScore }