import React, {useState} from "react";
import {useSelectContext} from "../../../context/SelectContext";
import {Modal} from "../Modal";
import {useTeam} from "../../../query/UseTeam";
import {getSensibleInitialPosition} from "../util/GetSensibleInitialPosition";
import {MiniTeamGraph} from "../../graph/mini/MiniTeamGraph";
import {PointsTable} from "../../points-table/PointsTable";
import {AsciiLoader} from "../../ascii-loader/AsciiLoader";
import {AsciiLoaderTilesetType} from "../../ascii-loader/AsciiLoaderTileset";

import styles from "./SelectedTeamModal.module.scss";
import {SelectedTeamModalTitle} from "./SelectedTeamModalTitle";

type SelectedTeamModalProps = {
    id: string;
}

const SelectedTeamModal: React.FC<SelectedTeamModalProps> = (props) => {
    const { id } = props

    const { deselectTeam } = useSelectContext();

    const { data, loading, error } = useTeam(id);

    const content = (loading || error) ? <AsciiLoader type={AsciiLoaderTilesetType.Circle} />: (
        <div className={styles.content}>
            <div className={styles.graph}>
                <MiniTeamGraph team={data!.team} />
            </div>
            <PointsTable team={data!.team} />
        </div>
    );

    return (
        <Modal
            title={<SelectedTeamModalTitle team={data?.team} />}
            height={500}
            initialPosition={getSensibleInitialPosition()}
            closable
            onClose={() => deselectTeam(id)}
        >
            {content}
        </Modal>
    )
}

export { SelectedTeamModal }