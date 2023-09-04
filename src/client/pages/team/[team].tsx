import React from "react";
import {gql, useQuery} from "@apollo/client";
import {TeamsGraph} from "../../common/component/graph/TeamsGraph";
import {Team} from "../../../graphql/generated/Resolver";
import {useRouter} from "next/router";

const Query = gql`
    query Query($teamId: TeamID!) {
        team(id: $teamId) {
            id
            name,
            color,
            points {
                id,
                adjustment,
                timestamp,
                reason
            }
        }
    }
`

const Team: React.FC = () => {
    const {
        query: {
            team
        }
    } = useRouter();

    const { data, loading, error } = useQuery<{ team: Team } | undefined>(Query, {
        variables: {
            teamId: team
        }
    });

    return (
        <div>
            {data?.team && <TeamsGraph teams={[data.team]} title={`://${data.team.name}`} showLegend={false} />}
        </div>
    )
}

export default Team;