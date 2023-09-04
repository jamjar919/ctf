import React from "react";
import {Modal} from "../../modal/Modal";
import {getSensibleInitialPosition} from "../../modal/util/GetSensibleInitialPosition";
import {useAdminContext} from "../../../context/AdminContext";

const AdminModal: React.FC = (props) => {

    const { secret, updateSecret, toggleAdminModal } = useAdminContext();

    return (
        <Modal
            title={"🔑 Admin Access Manager 🔑"}
            height={500}
            initialPosition={getSensibleInitialPosition()}
            closable
            onClose={() => toggleAdminModal()}
        >
            super secret password:
            <input
                value={secret}
                onChange={(e) => updateSecret(e.target.value)}
            />
        </Modal>
    )
}

export { AdminModal }