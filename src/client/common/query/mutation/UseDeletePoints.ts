import {gql, useMutation} from "@apollo/client";
import {FETCH_COMPETITION_QUERY} from "../UseCompetition";
import {FETCH_TEAM_QUERY} from "../UseTeam";

const Query = gql`
    mutation DeletePoints($deletePointsId: ID!) {
        deletePoints(id: $deletePointsId)
    }
`;

const useDeletePoints = () => useMutation(Query, {
    refetchQueries: [
        FETCH_COMPETITION_QUERY,
        FETCH_TEAM_QUERY
    ],
});

export { useDeletePoints }