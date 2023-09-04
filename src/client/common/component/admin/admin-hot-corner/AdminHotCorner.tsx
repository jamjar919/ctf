import React from "react";
import {HotCorner} from "../../hot-corner/HotCorner";
import {useAdminContext} from "../../../context/AdminContext";

import styles from "./AdminHotCorner.module.scss";

const AdminHotCorner: React.FC = () => {
    const { toggleAdminModal } = useAdminContext();

    return (
        <HotCorner
            size={100}
            onClick={() => toggleAdminModal()}
            position="top-left"
        >
            <div className={styles.content}>🔑</div>
        </HotCorner>
    )
}

export { AdminHotCorner }