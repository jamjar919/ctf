import React from "react";
import {Team} from "../../../../graphql/generated/Resolver";
import {getWinningTeam} from "../../util/GetWinningTeam";
import {useSelectContext} from "../../context/SelectContext";

import styles from "./Legend.module.scss";

type LegendProps = {
    teams: Team[]
}

const Legend: React.FC<LegendProps> = ({ teams}) => {
    const { toggleTeam } = useSelectContext();

    const winningTeam = getWinningTeam(teams);

    const rows = teams.map((team) => {
        return (
            <tr
                key={team.id}
                className={styles.teamRow}
                onClick={() => toggleTeam(team.id)}
            >
                <td className={styles.teamIcon}>{winningTeam?.id === team.id ? "👑" : "⬤"}</td>
                <td className={styles.teamColor}>
                    <div className={styles.colorCube} style={{ backgroundColor: team.color }} />
                </td>
                <td className={styles.total}>{team.score?.total ?? 0}</td>
                <td className={styles.name}>{team.name}</td>
            </tr>
        );
    })

    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <td className={styles.teamIcon} />
                    <td className={styles.teamColor} />
                    <td className={styles.total}>Total</td>
                    <td className={styles.name}>Name</td>
                    <td className={styles.buttonContainer}></td>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}

export { Legend }