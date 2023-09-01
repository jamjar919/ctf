import React from "react";
import {
    VictoryChart, VictoryGroup, VictoryLine, VictoryScatter, VictoryTooltip,
    VictoryVoronoiContainer
} from "victory";
import {Points, Team} from "../../../../graphql/generated/Resolver";
import {colorFromString} from "../../util/ColourFromString";
import {getPoints} from "./GetPoints";

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
                color={colorFromString(team.id)}
                data={data}
            >
                <VictoryLine />
            </VictoryGroup>
        )
    })

    const team = teams[0];

    console.log(team);

    return (
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
    )
}

export { AllTeamsGraph }