import {gql, useQuery} from "@apollo/client";
import {Team} from "../../../graphql/generated/Resolver";

const Query = gql`
    query Teams {
        teams {
            id
            name,
            color,
            points {
                id,
                adjustment,
                timestamp,
                reason
            }
        }
    }
`

const useTeams = () => useQuery<{ teams: Team[] } | undefined>(Query);

export { useTeams }