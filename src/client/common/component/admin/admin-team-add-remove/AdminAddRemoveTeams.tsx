import React from "react";
import {AdminAddNewTeam} from "../admin-add-new-team/AdminAddNewTeam";
import {AdminTeamList} from "../admin-team-list/AdminTeamList";

const AdminAddRemoveTeams: React.FC = () => {
    return (
        <div>
            <h2>Admin 🚧</h2>
            <AdminTeamList />
            <AdminAddNewTeam />
        </div>
    )
}

export { AdminAddRemoveTeams }