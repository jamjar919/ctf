import {gql, useMutation} from "@apollo/client";
import {FETCH_COMPETITION_QUERY} from "../UseCompetition";
import {TeamFragment} from "../fragment/TeamFragment";

const Query = gql`
    ${TeamFragment}
    mutation CreateTeam($teamName: String!, $competitionId: String!) {
        addTeam(teamName: $teamName, competitionId: $competitionId) {
            ...TeamProperties
        }
    }
`;

const useCreateTeam = () => useMutation(Query, {
    refetchQueries: [
        FETCH_COMPETITION_QUERY,
    ],
});

export { useCreateTeam }