import React from "react";
import {useSelectContext} from "../../../context/SelectContext";
import {SelectedTeamModal} from "../selected-team-modal/SelectedTeamModal";
import {useAdminContext} from "../../../context/AdminContext";
import {AdminModal} from "../../admin/admin-modal/AdminModal";

const ModalManager: React.FC = () => {
    const {selectedTeamIds} = useSelectContext();
    const {isAdminModalOpen} = useAdminContext();

    const selectedTeamModals = selectedTeamIds.map((id: string) => <SelectedTeamModal id={id} key={id} />)

    return (
        <>
            {selectedTeamModals}
            {isAdminModalOpen && <AdminModal />}
        </>
    )
}

export { ModalManager }