import {gql, useQuery} from "@apollo/client";
import {Competition} from "../../../graphql/generated/Resolver";

const FETCH_COMPETITIONS_QUERY = gql`
    query Competitions {
        competitions {
            id,
            start,
            end,
        }
    }
`

const useCompetition = () => useQuery<{ competition: Competition } | undefined>(FETCH_COMPETITIONS_QUERY);

export { useCompetition, FETCH_COMPETITIONS_QUERY };