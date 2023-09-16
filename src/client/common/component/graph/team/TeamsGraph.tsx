import React from "react";
import {
    LineSegment,
    VictoryAxis,
    VictoryChart, VictoryGroup, VictoryLabel, VictoryLegend, VictoryLine, VictoryScatter, VictoryTooltip,
    VictoryVoronoiContainer
} from "victory";
import {Team} from "../../../../../graphql/generated/Resolver";
import {getPoints} from "../util/GetPoints";
import {getLabelText} from "../util/GetLabelText";
import {getAxisText} from "../util/GetAxisText";
import {useSelectContext} from "../../../context/SelectContext";
import {EventPropTypeInterface} from "victory-core";
import {VictoryLineTTargetType} from "victory-line/lib/victory-line";
import {Simulate} from "react-dom/test-utils";
import ended = Simulate.ended;

const fontFamily = "Fira Code"

type TeamsGraphProps = {
    /** Chart title */
    title: string,
    /** Team information with points to display */
    teams: Team[],
    /** Start time as a UTC timestamp */
    start: string,
    /** End time as a UTC timestamp */
    end: string
}

/**
 * Show a graph of a list of teams, representing the points they have earned.
 */
const TeamsGraph: React.FC<TeamsGraphProps> = ({ teams, start, end, title }) => {

    const { toggleTeam } = useSelectContext();

    const groups = teams.map((team) => {
        if (!team.score?.points) {
            return null
        }

        const data = getPoints(
            team.score.points,
            start
        )

        const events: EventPropTypeInterface<VictoryLineTTargetType, number | string>[] = [
            {
                target: 'data',
                eventHandlers: {
                    onClick: () => {
                        toggleTeam(team.id);
                    },
                },
            },
        ];

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
                    events={events}
                    style={{
                        data: {
                            cursor: 'hand',
                        },
                    }}
                />
                <VictoryScatter
                    name="scatter"
                    events={events}
                    style={{
                        data: {
                            cursor: 'hand',
                        },
                    }}
                />
            </VictoryGroup>
        )
    })

    const xDomain = [
        new Date(start),
        new Date(end)
    ] as any

    return (
        <div style={{ height: "100vh", width: "100vw" }}>
            <VictoryChart
                domain={{
                    x: xDomain,
                }}
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
                    tickCount={12}
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