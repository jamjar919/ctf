import React from "react";
import {useTeams} from "../../../query/UseTeams";
import {AsciiLoader} from "../../ascii-loader/AsciiLoader";
import {AsciiLoaderTilesetType} from "../../ascii-loader/AsciiLoaderTileset";
import {useDeleteTeam} from "../../../query/UseDeleteTeam";

const AdminTeamList: React.FC = () => {
    const { data } = useTeams();

    const [deleteTeam] = useDeleteTeam();

    if (data) {
        return (
            <table>
                <tbody>
                    {data.teams.map((team) => {
                        return (
                            <tr>
                                <td>{team.name}</td>
                                <td>{team.color}</td>
                                <td>
                                    <button onClick={() => deleteTeam({
                                        variables: {
                                            teamId: team.id
                                        }
                                    })}>❌</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        )
    }

    return <AsciiLoader type={AsciiLoaderTilesetType.Line} />;
}

export { AdminTeamList };