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
import {getWinningTeam} from "../../util/GetWinningTeam";

type AllTeamsGraphProps = {
    teams: Team[]
}

const getLabelText = (datum: any): string => {
    if (datum.adjustment) {
        return `${datum.reason}: ${datum.adjustment}`
    }

    return datum.reason;
}

const getAxisText = (date: Date): string => {
    return `${date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}`
}

const AllTeamsGraph: React.FC<AllTeamsGraphProps> = ({ teams }) => {

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
                scale={{x: 'time'}}
                padding={60}
                domainPadding={{
                    x: 0,
                    y: 10
                }}
                containerComponent={
                    <VictoryVoronoiContainer
                        labels={({datum}) => getLabelText(datum)}
                        labelComponent={
                            <VictoryTooltip
                                style={{fontSize: 8}}
                            />
                        }
                        voronoiBlacklist={["line"]}
                    />
                }
            >
                <VictoryLegend
                    title={[
                        "Capture the flag leaderboard",
                        `Winning team: ${getWinningTeam(teams).name}`
                    ]}
                    x={50}
                    y={10}
                    data={[]}
                />
                {groups}
                <VictoryAxis
                    crossAxis
                    label="Time (ms)"
                    axisLabelComponent={<VictoryLabel dy={10}/>}
                    gridComponent={<LineSegment style={{ backgroundColor: "black" }} />}
                    tickCount={10}
                    tickFormat={(t: Date) => getAxisText(t)}
                    tickLabelComponent={<VictoryLabel angle={45} />}
                    style={{
                        ticks: {stroke: "grey", size: 5},
                    }}
                />
                <VictoryAxis
                    dependentAxis
                    label="Points"
                    axisLabelComponent={<VictoryLabel dy={-20}/>}
                    gridComponent={<LineSegment style={{ backgroundColor: "black" }} />}
                />
            </VictoryChart>
            <Legend teams={teams} />
        </div>
    )
}

export { AllTeamsGraph }