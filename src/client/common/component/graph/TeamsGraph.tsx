import React from "react";
import {
    LineSegment,
    VictoryAxis,
    VictoryChart, VictoryGroup, VictoryLabel, VictoryLegend, VictoryLine, VictoryScatter, VictoryTheme, VictoryTooltip,
    VictoryVoronoiContainer
} from "victory";
import {Team} from "../../../../graphql/generated/Resolver";
import {getPoints} from "./GetPoints";
import {getLabelText} from "./GetLabelText";
import {getAxisText} from "./GetAxisText";

const fontFamily = "Fira Code"

type TeamsGraphProps = {
    /** Chart title */
    title: string,
    /** Team information with points to display */
    teams: Team[]
}

/**
 * Represent
 * @param teams
 * @param title
 * @constructor
 */
const TeamsGraph: React.FC<TeamsGraphProps> = ({ teams, title }) => {

    const groups = teams.map((team) => {
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
    })

    return (
        <div style={{ height: "100vh", width: "100vw" }}>
            <VictoryChart
                padding={{
                    top: 30,
                    bottom: 60,
                    left: 60,
                    right: 20
                }}
                domainPadding={{
                    x: 0,
                    y: 10
                }}
                containerComponent={
                    <VictoryVoronoiContainer
                        labels={({datum}) => getLabelText(datum)}
                        labelComponent={
                            <VictoryTooltip
                                constrainToVisibleArea
                                style={{
                                    fontSize: 8,
                                    fontFamily
                                }}
                            />
                        }
                        voronoiBlacklist={["line"]}
                    />
                }
            >
                <VictoryLegend
                    title={title}
                    x={50}
                    data={[]}
                    style={{
                        title: { fontFamily }
                    }}
                />
                {groups}
                <VictoryAxis
                    crossAxis
                    gridComponent={<LineSegment style={{ backgroundColor: "black" }} />}
                    tickCount={10}
                    tickFormat={(t: Date) => getAxisText(t)}
                    tickLabelComponent={<VictoryLabel angle={45} />}
                    style={{
                        ticks: {stroke: "grey", size: 5},
                        tickLabels: { fontFamily },
                        axisLabel: { fontFamily }
                    }}
                />
                <VictoryAxis
                    dependentAxis
                    label="Points"
                    axisLabelComponent={<VictoryLabel dy={-20}/>}
                    gridComponent={<LineSegment style={{ backgroundColor: "black" }} />}
                    style={{
                        ticks: {stroke: "grey", size: 5},
                        tickLabels: { fontFamily },
                        axisLabel: { fontFamily }
                    }}
                />
            </VictoryChart>
        </div>
    )
}

export { TeamsGraph }