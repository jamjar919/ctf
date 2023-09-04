import {gql, useQuery} from "@apollo/client";
import {Team} from "../../../graphql/generated/Resolver";

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

const useTeam = (teamId: string) => useQuery<{ team: Team } | undefined>(Query, {
    variables: {
        teamId: teamId
    }
});

export { useTeam }