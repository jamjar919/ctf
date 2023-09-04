import React from "react";
import {TeamsGraph} from "../../common/component/graph/team/TeamsGraph";
import {useRouter} from "next/router";
import {useTeam} from "../../common/query/UseTeam";

const Team: React.FC = () => {
    const {
        query: {
            team
        }
    } = useRouter();

    const { data } = useTeam(String(team))

    return (
        <div>
            {data?.team && <TeamsGraph teams={[data.team]} title={`://${data.team.name}`} />}
        </div>
    )
}

export default Team;