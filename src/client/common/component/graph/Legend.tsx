import {VictoryLegend} from "victory";
import React from "react";
import {Team} from "../../../../graphql/generated/Resolver";
import {getWinningTeam} from "../../util/GetWinningTeam";

type LegendProps = {
    teams: Team[]
}

const Legend: React.FC<LegendProps> = ({ teams}) => {
    const winningTeam = getWinningTeam(teams);

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