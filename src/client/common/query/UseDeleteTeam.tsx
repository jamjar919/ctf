import {gql, useMutation} from "@apollo/client";
import {FETCH_ALL_TEAMS_QUERY} from "./UseTeams";

const Query = gql`
    mutation DeleteTeam($teamId: TeamID!) {
        deleteTeam(id: $teamId)
    }
`;

const useDeleteTeam = () => useMutation(Query, {
    refetchQueries: [
        FETCH_ALL_TEAMS_QUERY,
    ],
});

export { useDeleteTeam }