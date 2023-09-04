import React from "react";
import {Modal} from "../../modal/Modal";
import {getSensibleInitialPosition} from "../../modal/util/GetSensibleInitialPosition";
import {useAdminContext} from "../../../context/AdminContext";

import styles from "./AdminModal.module.scss";
import {AdminAddRemoveTeams} from "../admin-team-add-remove/AdminAddRemoveTeams";

const AdminModal: React.FC = () => {

    const { secret, updateSecret, toggleAdminModal } = useAdminContext();

    return (
        <Modal
            title={"🔑 Admin Access Manager 🔑"}
            height={500}
            initialPosition={getSensibleInitialPosition()}
            closable
            onClose={() => toggleAdminModal()}
        >
            <div className={styles.passwordContainer}>
                super secret password:
                <input
                    type="password"
                    value={secret}
                    onChange={(e) => updateSecret(e.target.value)}
                />
            </div>
            <AdminAddRemoveTeams />
        </Modal>
    )
}

export { AdminModal }