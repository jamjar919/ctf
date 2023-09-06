import {gql, useMutation} from "@apollo/client";
import {FETCH_ALL_TEAMS_QUERY} from "../UseTeams";
import {TeamFragment} from "../fragment/TeamFragment";
import {FETCH_TEAM_QUERY} from "../UseTeam";

const Query = gql`
    ${TeamFragment}
    mutation AddPoints($teamId: ID!, $adjustment: Int!, $reason: String!, $timestamp: DateTime) {
        addPoints(teamId: $teamId, adjustment: $adjustment, reason: $reason, timestamp: $timestamp) {
            ...TeamProperties
        }
    }
`;

const useAddPoints = () => useMutation(Query, {
    refetchQueries: [
        FETCH_ALL_TEAMS_QUERY,
        FETCH_TEAM_QUERY
    ],
});

export { useAddPoints }