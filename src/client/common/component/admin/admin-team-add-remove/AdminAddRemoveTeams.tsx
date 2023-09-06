import React from "react";
import {AdminAddNewTeamForm} from "../admin-add-new-team/AdminAddNewTeamForm";
import {useTeams} from "../../../query/UseTeams";
import {AsciiLoader} from "../../ascii-loader/AsciiLoader";
import {AsciiLoaderTilesetType} from "../../ascii-loader/AsciiLoaderTileset";

import styles from "./AdminAddRemoveTeams.module.scss";

const AdminAddRemoveTeams: React.FC = () => {
    const { data } = useTeams();

    if (data) {
        return (
            <div>
                <h2>Admin 🚧</h2>
                <table className={styles.table}>
                    <tbody>
                    {data.teams.map((team) => {
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