import {Points} from "../../../graphql/generated/Resolver";
import {MongoPoints} from "../../database/type/MongoPoints";

const mapDatabasePointsToGraph = (mongoPoints: MongoPoints): Points => {
    return {
        id: mongoPoints._id.toString(),
        teamId: mongoPoints.teamId,
        adjustment: mongoPoints.adjustment,
        reason: mongoPoints.reason,
        timestamp: mongoPoints.timestamp
    };
};

export { mapDatabasePointsToGraph }
