import {MongoCompetition} from "../../database/type/MongoCompetition";
import {Competition} from "../../../graphql/generated/Resolver";

const mapDatabaseCompetitionToGraph = (competition: MongoCompetition): Competition => {
    return {
        id: competition._id,
        start: competition.start,
        end: competition.end,
    }
}

export { mapDatabaseCompetitionToGraph }