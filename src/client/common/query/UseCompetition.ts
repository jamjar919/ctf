import {gql, useQuery} from "@apollo/client";
import {Competition} from "../../../graphql/generated/Resolver";
import {TeamFragment} from "./fragment/TeamFragment";

const FETCH_COMPETITION_QUERY = gql`
    ${TeamFragment}
    query Competition($competitionId: ID!) {
        competition(id: $competitionId) {
            id,
            start,
            end,
            teams {
                ...TeamProperties
            }
        }
    }
`

const useCompetition = (competitionId: string) => useQuery<{ competition: Competition } | undefined>(FETCH_COMPETITION_QUERY, {
    variables: {
        competitionId: competitionId
    }
});

export { useCompetition, FETCH_COMPETITION_QUERY };