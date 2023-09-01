import React from "react";
import {gql, useQuery} from "@apollo/client";
import {AllTeamsGraph} from "../common/component/graph/AllTeamsGraph";
import {Team} from "../../graphql/generated/Resolver";

const Query = gql`
    query Teams {
        teams {
            id
            name,
            points {
                id,
                adjustment,
                timestamp,
                reason
            }
        }
    }
`

type IndexProps = {}

const Index: React.FC<IndexProps> = () => {

    const { data, loading, error } = useQuery<{ teams: Team[] } | undefined>(Query);

    return (
        <div>
            {data?.teams && <AllTeamsGraph teams={data.teams} />}
        </div>
    )
}

export default Index;