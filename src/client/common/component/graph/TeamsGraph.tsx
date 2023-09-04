import React from "react";
import {
    LineSegment,
    VictoryAxis,
    VictoryChart, VictoryGroup, VictoryLabel, VictoryLegend, VictoryLine, VictoryScatter, VictoryTheme, VictoryTooltip,
    VictoryVoronoiContainer
} from "victory";
import {Team} from "../../../../graphql/generated/Resolver";
import {getPoints} from "./GetPoints";
import {Legend} from "./Legend";

const fontFamily = "Fira Code"

type TeamsGraphProps = {
    title: string,
    teams: Team[],
    showLegend: boolean
}

const getLabelText = (datum: any): string => {
    if (datum.adjustment) {
        return `[${getAxisText(datum.x)}] ${datum.reason}: ${datum.adjustment}`
    }

    return `[${getAxisText(datum.x)}] ${datum.reason}`;
}

const getAxisText = (date: Date): string => {
    return `${new Date(date).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}`
}

const TeamsGraph: React.FC<TeamsGraphProps> = ({ teams, title, showLegend }) => {

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
            {showLegend && <Legend teams={teams} />}
        </div>
    )
}

export { TeamsGraph }