import {gql, useQuery} from "@apollo/client";
import {Team} from "../../../graphql/generated/Resolver";
import {TeamFragment} from "./fragment/TeamFragment";

const FETCH_TEAM_QUERY = gql`
    ${TeamFragment}
    query Query($teamId: TeamID!) {
        team(id: $teamId) {
            ...TeamProperties
        }
    }
`

const useTeam = (teamId: string) => useQuery<{ team: Team } | undefined>(FETCH_TEAM_QUERY, {
    variables: {
        teamId: teamId
    }
});

export { useTeam, FETCH_TEAM_QUERY }