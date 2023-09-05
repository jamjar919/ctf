import React from "react";
import {AdminAddNewTeamForm} from "../admin-add-new-team/AdminAddNewTeamForm";
import {AdminTeamList} from "../admin-team-list/AdminTeamList";

const AdminAddRemoveTeams: React.FC = () => {
    return (
        <div>
            <h2>Admin 🚧</h2>
            <AdminTeamList />
            <AdminAddNewTeamForm />
        </div>
    )
}

export { AdminAddRemoveTeams }