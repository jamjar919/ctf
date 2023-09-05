import {gql} from "@apollo/client";

const TeamFragment = gql`
    fragment TeamProperties on Team {
        id
        name,
        color,
        score {
            total,
            points {
                id,
                adjustment,
                timestamp,
                reason
            }
        }
    }
`

export { TeamFragment }