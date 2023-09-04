import React from "react";
import {useSelectContext} from "../../../context/SelectContext";
import {SelectedTeamModal} from "../selected-team-modal/SelectedTeamModal";

const ModalManager: React.FC = () => {
    const {selectedTeamIds} = useSelectContext();

    const selectedTeamModals = selectedTeamIds.map((id: string) => <SelectedTeamModal id={id} key={id} />)

    return (
        <>
            {selectedTeamModals}
        </>
    )
}

export { ModalManager }