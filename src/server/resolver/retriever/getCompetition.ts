import {Competition} from "../../../graphql/generated/Resolver";
import {competitionCollection} from "../../database/mongoClient";
import {mapDatabaseCompetitionToGraph} from "../converter/mapDatabaseCompetitionToGraph";
import {MongoCompetition} from "../../database/type/MongoCompetition";

const getCompetition = async (id: string): Promise<Competition> => {
    const maybeCompetition: MongoCompetition | null = await competitionCollection.findOne({ _id: id })

    if (maybeCompetition == null) {
        throw new Error(`No competition found with id ${id}`);
    }

    return mapDatabaseCompetitionToGraph(maybeCompetition);
}

export { getCompetition }