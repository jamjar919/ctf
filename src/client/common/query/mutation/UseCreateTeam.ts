import {gql, useMutation} from "@apollo/client";
import {FETCH_ALL_TEAMS_QUERY} from "../UseTeams";
import {TeamFragment} from "../fragment/TeamFragment";

const Query = gql`
    ${TeamFragment}
    mutation CreateTeam($teamName: String!) {
        addTeam(teamName: $teamName) {
            ...TeamProperties
        }
    }
`;

const useCreateTeam = () => useMutation(Query, {
    refetchQueries: [
        FETCH_ALL_TEAMS_QUERY,
    ],
});

export { useCreateTeam }