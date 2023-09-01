import {VictoryLegend} from "victory";
import React from "react";
import {Team} from "../../../../graphql/generated/Resolver";

type LegendProps = {
    teams: Team[]
}

const Legend: React.FC<LegendProps> = ({ teams}) => {
    const winningTeam = teams.reduce((team, currentBest) => {
        const teamPoints: number = team?.points.reduce((a,b) => a + b.adjustment, 0) ?? 0;
        const currentBestPoints: number = currentBest?.points.reduce((a,b) => a + b.adjustment, 0) ?? 0;

        if (teamPoints > currentBestPoints) {
            return team;
        }

        return currentBest;
    }, null)

    const data = teams.map((team) => {
        return  {
            name: team.name,
            symbol: {
                fill: team.color,
                type: winningTeam.id === team.id ? "star" : "circle"
            }
        }
    })

    return (
        <VictoryLegend
            orientation={"horizontal"}
            data={data}
        />
    )
}

export { Legend }