import {gql, useMutation} from "@apollo/client";
import {FETCH_ALL_TEAMS_QUERY} from "../UseTeams";
import {FETCH_TEAM_QUERY} from "../UseTeam";

const Query = gql`
    mutation DeletePoints($deletePointsId: ID!) {
        deletePoints(id: $deletePointsId)
    }
`;

const useDeletePoints = () => useMutation(Query, {
    refetchQueries: [
        FETCH_ALL_TEAMS_QUERY,
        FETCH_TEAM_QUERY
    ],
});

export { useDeletePoints }