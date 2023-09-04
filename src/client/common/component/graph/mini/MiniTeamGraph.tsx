import React from "react";
import {
    LineSegment,
    VictoryAxis,
    VictoryChart, VictoryGroup, VictoryLabel, VictoryLegend, VictoryLine, VictoryScatter, VictoryTheme, VictoryTooltip,
    VictoryVoronoiContainer
} from "victory";
import {Team} from "../../../../../graphql/generated/Resolver";
import {getPoints} from "../util/GetPoints";
import {getLabelText} from "../util/GetLabelText";
import {getAxisText} from "../util/GetAxisText";

const fontFamily = "Fira Code"

type TeamsGraphProps = {
    /** Team information with points to display */
    team: Team
}

/**
 * Simpler team graph - smaller + with no axes.
 */
const MiniTeamGraph: React.FC<TeamsGraphProps> = ({ team }) => {

    if (!team.points) {
        return null
    }

    const data = getPoints(team.points)

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