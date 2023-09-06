import React from "react";
import {Team} from "../../../../graphql/generated/Resolver";
import {getAxisText} from "../graph/util/GetAxisText";
import {AdminAddPointsForm} from "../admin/admin-add-points/AdminAddPointsForm";
import {useAdminContext} from "../../context/AdminContext";
import {AdminDeletePointsButton} from "../admin/admin-delete-points/AdminDeletePoints";

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

    const { enableAdminTools } = useAdminContext();

    const rows = (team?.score?.points ?? []).map((points) => {
        if (!points) {
            return null;
        }

        return (
            <tr key={points.id}>
                <td className={styles.indicator}>{getIndicator(points.adjustment)}</td>
                <td className={styles.timestamp}>{getAxisText(points.timestamp)}</td>
                <td className={styles.adjustment}>{points.adjustment}</td>
                <td className={styles.reason}>{points.reason}</td>
                {enableAdminTools && <td className={styles.edit}><AdminDeletePointsButton pointsId={points.id}/></td>}
            </tr>
        );
    });

    if (rows.length === 0) {
        rows.push(
            <tr key="no-points" className={styles.noPoints}>
                <td>
                    No points for this team yet
                </td>
            </tr>
        )
    }

    return (
        <>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td className={styles.indicator}>o</td>
                        <td className={styles.timestamp}>Time</td>
                        <td className={styles.adjustment}>Points</td>
                        <td className={styles.reason}>Reason</td>
                        {enableAdminTools && <td className={styles.edit}>Delete</td>}
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
            {enableAdminTools && <AdminAddPointsForm key={"add-points"} team={team} />}
        </>
    )
}

export { PointsTable }