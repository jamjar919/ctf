import {gql, useMutation} from "@apollo/client";

const Query = gql`
    mutation CreateTeam($teamName: String!) {
        addTeam(teamName: $teamName)
    }
`;

const useCreateTeam = () => useMutation(Query);

export { useCreateTeam }