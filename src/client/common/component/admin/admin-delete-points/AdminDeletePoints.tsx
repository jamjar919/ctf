import React from "react";
import {useDeletePoints} from "../../../query/mutation/UseDeletePoints";

import styles from "./AdminDeletePoints.module.scss";

type AdminDeletePointsProps = {
    pointsId: string
}

const AdminDeletePointsButton: React.FC<AdminDeletePointsProps> = ({ pointsId}) => {
    const [mutateFunction] = useDeletePoints();

    return (
        <button
            className={styles.button}
            type="button"
            onClick={() => mutateFunction({
                variables: {
                    deletePointsId: pointsId
                }
            })}
        >
            ❌
        </button>
    )
}

export { AdminDeletePointsButton }