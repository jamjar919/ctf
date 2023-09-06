import React, {useState} from "react";
import {AsciiLoader} from "../../ascii-loader/AsciiLoader";
import {AsciiLoaderTilesetType} from "../../ascii-loader/AsciiLoaderTileset";
import {AdminUpdateTeamForm} from "../../admin/admin-update-team/AdminUpdateTeamForm";
import {Team} from "../../../../../graphql/generated/Resolver";
import {useAdminContext} from "../../../context/AdminContext";

type SelectedTeamModalTitleProps = {
    team?: Team
}

const SelectedTeamModalTitle: React.FC<SelectedTeamModalTitleProps> = ({ team }) => {
    const { enableAdminTools } = useAdminContext();

    const [isEditing, setIsEditing] = useState(false);

    if (!team) {
        return <AsciiLoader type={AsciiLoaderTilesetType.Circle} />;
    }

    if (isEditing) {
        return (
            <span>
                <AdminUpdateTeamForm
                    team={team}
                    afterSubmit={() => setIsEditing(false)}
                />
            </span>
        )
    }

    return (
        <span onClick={() => enableAdminTools && setIsEditing(true)}>
            {team.name} {enableAdminTools && "✎"}
        </span>
    )
}

export { SelectedTeamModalTitle }