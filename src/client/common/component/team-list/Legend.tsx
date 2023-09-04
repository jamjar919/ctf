import React from "react";
import {Team} from "../../../../graphql/generated/Resolver";
import {getWinningTeam} from "../../util/GetWinningTeam";
import {useSelectContext} from "../../context/SelectContext";

type LegendProps = {
    teams: Team[]
}

const Legend: React.FC<LegendProps> = ({ teams}) => {
    const { toggleTeam } = useSelectContext();

    const winningTeam = getWinningTeam(teams);

    const rows = teams.map((team) => {
        return (
            <tr key={team.id}>
                <td>{winningTeam.id === team.id ? "star" : "circle"}</td>
                <td>{team.name}</td>
                <td>
                    <button onClick={() => toggleTeam(team.id)}>View</button>
                </td>
            </tr>
        );
    })

    return (
        <table>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}

export { Legend }