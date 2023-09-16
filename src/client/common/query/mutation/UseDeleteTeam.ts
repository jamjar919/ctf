import {gql, useMutation} from "@apollo/client";
import {FETCH_COMPETITION_QUERY} from "../UseCompetition";

const Query = gql`
    mutation DeleteTeam($teamId: ID!) {
        deleteTeam(id: $teamId)
    }
`;

const useDeleteTeam = () => useMutation(Query, {
    refetchQueries: [
        FETCH_COMPETITION_QUERY,
    ],
});

export { useDeleteTeam }