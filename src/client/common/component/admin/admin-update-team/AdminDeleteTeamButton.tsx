import React from "react";
import {Team} from "../../../../../graphql/generated/Resolver";
import {useDeleteTeam} from "../../../query/mutation/UseDeleteTeam";

type AdminDeleteTeamButtonProps = {
    team: Team
}

const AdminDeleteTeamButton: React.FC<AdminDeleteTeamButtonProps> = ({ team }) => {
    const [deleteTeam] = useDeleteTeam();

    return (
        <button onClick={() => deleteTeam({
            variables: {
                teamId: team.id
            }
        })}>❌</button>
    )
}

export { AdminDeleteTeamButton }