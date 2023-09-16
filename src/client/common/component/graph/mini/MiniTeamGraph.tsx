import React from "react";
import {
    VictoryGroup, VictoryLine, VictoryScatter,
} from "victory";
import {Team} from "../../../../../graphql/generated/Resolver";
import {getPoints} from "../util/GetPoints";

const fontFamily = "Fira Code"

type TeamsGraphProps = {
    /** Team information with points to display */
    team: Team,
    /** Start time in UTC */
    start: string
}

/**
 * Simpler team graph - smaller + with no axes.
 */
const MiniTeamGraph: React.FC<TeamsGraphProps> = ({ team, start }) => {

    if (!team?.score?.points) {
        return null;
    }

    const data = getPoints(team.score.points, start)

    return (
        <VictoryGroup
            key={team.id}
            color={team.color}
            data={data}
            animate={{ duration: 2000 }}
            style={{
                labels: {
                    fontFamily
                }
            }}
            height={100}
            padding={20}
        >
            <VictoryLine
                name="line"
                interpolation="linear"
                animate={{
                    animationWhitelist: ["style", "data", "size"],
                    onExit: {
                        duration: 500,
                        before: () => ({ opacity: 0.3, _y: 0 })
                    },
                    onEnter: {
                        duration: 500,
                        before: () => ({ opacity: 0.3, _y: 0 }),
                        after: (datum) => ({ opacity: 1, _y: datum._y })
                    }
                }}
            />
            <VictoryScatter name="scatter"/>
        </VictoryGroup>
    )
}

export { MiniTeamGraph }