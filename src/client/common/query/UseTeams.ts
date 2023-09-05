import {gql, useQuery} from "@apollo/client";
import {Team} from "../../../graphql/generated/Resolver";
import {TeamFragment} from "./fragment/TeamFragment";

const FETCH_ALL_TEAMS_QUERY = gql`
    ${TeamFragment}
    query Teams {
        teams {
            ...TeamProperties
        }
    }
`

const useTeams = () => useQuery<{ teams: Team[] } | undefined>(FETCH_ALL_TEAMS_QUERY);

export { useTeams, FETCH_ALL_TEAMS_QUERY }