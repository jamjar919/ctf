import React from "react";
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
import {useCompetition} from "../../../query/UseCompetition";
import {useCurrentCompetitionIdFromUrl} from "../../../hook/UseCurrentCompetitionIdFromUrl";

type SelectedTeamModalProps = {
    id: string;
}

const SelectedTeamModal: React.FC<SelectedTeamModalProps> = (props) => {
    const { id } = props

    const { deselectTeam } = useSelectContext();

    const competition = useCurrentCompetitionIdFromUrl();

    const { data, loading, error } = useTeam(id);

    const { data: compData, loading: compLoading, error: compError } = useCompetition(competition);

    const content = (loading || error || compLoading || compError) ? <AsciiLoader type={AsciiLoaderTilesetType.Circle} />: (
        <div className={styles.content}>
            <div className={styles.graph}>
                <MiniTeamGraph team={data!.team} start={compData!.competition.start} />
            </div>
            <PointsTable team={data!.team} startDateTime={compData!.competition.start} />
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