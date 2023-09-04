import React from "react";
import {useSelectContext} from "../../../context/SelectContext";
import {Modal} from "../Modal";

type SelectedTeamModalProps = {
    id: string;
}

const SelectedTeamModal: React.FC<SelectedTeamModalProps> = (props) => {
    const { id } = props

    const { deselectTeam } = useSelectContext();

    return (
        <Modal
            title={id}
            width={300}
            height={500}
            initialPosition={[10, 10]}
            closable
            onClose={() => deselectTeam(id)}
        >
            <div style={{ height: "100%", overflow: "scroll" }}>
                {id}
            </div>
        </Modal>
    )
}

export { SelectedTeamModal }