import React from "react";
import {Team} from "../../../../graphql/generated/Resolver";
import {getAxisText} from "../graph/util/GetAxisText";

import styles from "./PointsTable.module.scss";

type PointsTableProps = {
    team: Team
}


const getIndicator = (adjustment: number): string => {
    if (adjustment === 0) {
        return "o";
    }

    return adjustment > 0 ? "↑" : "↓";
}

const PointsTable: React.FC<PointsTableProps> = ({ team }) => {

    if (!team.points || team.points.length === 0) {
        return (
            <div className={styles.noPoints}>
                No points for this team yet
            </div>
        )
    }

    const rows = team.points.map((points) => {
        return (
            <tr key={points.id}>
                <td className={styles.indicator}>{getIndicator(points.adjustment)}</td>
                <td className={styles.timestamp}>{getAxisText(points.timestamp)}</td>
                <td className={styles.adjustment}>{points.adjustment}</td>
                <td className={styles.reason}>{points.reason}</td>
            </tr>
        );
    })

    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <td className={styles.indicator}>o</td>
                    <td className={styles.timestamp}>Time</td>
                    <td className={styles.adjustment}>Points</td>
                    <td className={styles.reason}>Reason</td>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}

export { PointsTable }