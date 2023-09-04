import React from "react";
import {useSelectContext} from "../../../context/SelectContext";
import {Modal} from "../Modal";
import {useTeam} from "../../../query/UseTeam";
import {getSensibleInitialPosition} from "../util/GetSensibleInitialPosition";
import {MiniTeamGraph} from "../../graph/mini/MiniTeamGraph";
import {PointsTable} from "../../points-table/PointsTable";
import {FullscreenLoader} from "../../fullscreen-loader/FullscreenLoader";

import styles from "./SelectedTeamModal.module.scss";
import {AsciiLoader} from "../../ascii-loader/AsciiLoader";
import {AsciiLoaderTilesetType} from "../../ascii-loader/AsciiLoaderTileset";
import {useAdminContext} from "../../../context/AdminContext";

type SelectedTeamModalProps = {
    id: string;
}

const SelectedTeamModal: React.FC<SelectedTeamModalProps> = (props) => {
    const { id } = props

    const { deselectTeam } = useSelectContext();

    const { enableAdminTools } = useAdminContext();

    const { data, loading, error } = useTeam(id);

    const content = (loading || error) ? <FullscreenLoader /> : (
        <div className={styles.content}>
            <div className={styles.graph}>
                <MiniTeamGraph team={data!.team} />
            </div>
            <PointsTable team={data!.team} />
        </div>
    );

    return (
        <Modal
            title={data?.team?.name ?? <AsciiLoader type={AsciiLoaderTilesetType.Sonar} />}
            height={500}
            initialPosition={getSensibleInitialPosition()}
            closable
            onClose={() => deselectTeam(id)}
        >
            {content}
            {enableAdminTools && <div>points</div>}
        </Modal>
    )
}

export { SelectedTeamModal }