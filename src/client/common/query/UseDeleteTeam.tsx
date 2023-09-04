import {gql, useMutation} from "@apollo/client";

const Query = gql`
    mutation DeleteTeam($teamId: TeamID!) {
        deleteTeam(id: $teamId)
    }
`;

const useDeleteTeam = () => useMutation(Query);

export { useDeleteTeam }