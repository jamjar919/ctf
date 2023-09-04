import {Points} from "../../../../../graphql/generated/Resolver";

type Datum = {
    x: Date,
    y: number,
    reason: string,
    adjustment: number | null
}

/**
 * Retrieve a set of points representing a team's score
 */
const getPoints = (
    points: Points[]
): Datum[] => {
    const startTime = new Date();
    startTime.setUTCHours(0, 0, 0)

    const startingPoint: Datum = {
        x: startTime,
        y: 0,
        reason: "Start!",
        adjustment: 0
    }

    let total = 0;
    const data: Datum[] = points.map((point: Points) => {
        total += point.adjustment;

        return {
            x: new Date(point.timestamp),
            y: total,
            reason: point.reason,
            adjustment: point.adjustment
        }
    })

    const endingPoint: Datum = {
        x: new Date(),
        y: total,
        reason: "Current total",
        adjustment: null
    }

    return [
        startingPoint,
        ...data,
        endingPoint
    ]
}

export { getPoints }