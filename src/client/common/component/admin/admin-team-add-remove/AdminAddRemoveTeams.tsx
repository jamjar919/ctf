import React from "react";
import {AdminAddNewTeamForm} from "../admin-add-new-team/AdminAddNewTeamForm";
import {useCompetition} from "../../../query/UseCompetition";
import {AsciiLoader} from "../../ascii-loader/AsciiLoader";
import {AsciiLoaderTilesetType} from "../../ascii-loader/AsciiLoaderTileset";
import {useCurrentCompetitionIdFromUrl} from "../../../hook/UseCurrentCompetitionIdFromUrl";

import styles from "./AdminAddRemoveTeams.module.scss";

const AdminAddRemoveTeams: React.FC = () => {
    const competition = useCurrentCompetitionIdFromUrl();

    const { data } = useCompetition(competition);

    if (data) {
        const {
            id,
            start,
            end,
            teams
        } = data.competition;

        return (
            <div>
                <div>Current competition: <strong>{id}</strong></div>
                <div>Time: {new Date(start).toLocaleString()} {'=>'} {new Date(end).toLocaleString()}</div>
                <h2>Add a team 🚧</h2>
                <table className={styles.table}>
                    <tbody>
                    {teams!.map((team) => {
                        return (
                            <tr key={team.id}>
                                <td>{team.name}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </table>
                <AdminAddNewTeamForm />
            </div>
        )
    }

    return <AsciiLoader type={AsciiLoaderTilesetType.Line} />;
}

export { AdminAddRemoveTeams }