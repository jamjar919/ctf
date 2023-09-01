import React from "react";
import {
    VictoryChart, VictoryGroup, VictoryLabel, VictoryLegend, VictoryLine, VictoryScatter, VictoryTooltip,
    VictoryVoronoiContainer
} from "victory";
import {Team} from "../../../../graphql/generated/Resolver";
import {getPoints} from "./GetPoints";
import {Legend} from "./Legend";

type AllTeamsGraphProps = {
    teams: Team[]
}

const getLabelText = (datum: any): string => {
    if (datum.adjustment) {
        return `${datum.reason}: ${datum.adjustment}`
    }

    return datum.reason;
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
            </VictoryGroup>
        )
    })

    const team = teams[0];

    console.log(team);

    return (
        <>
            <VictoryChart
                scale={{x: 'time'}}
                domainPadding={10}
                height={200}
                containerComponent={
                    <VictoryVoronoiContainer
                        labels={({datum}) => getLabelText(datum)}
                        labelComponent={
                            <VictoryTooltip
                                style={{fontSize: 8}}
                            />
                        }
                    />
                }
            >
                {groups}
            </VictoryChart>
            <Legend teams={teams} />
        </>
    )
}

export { AllTeamsGraph }