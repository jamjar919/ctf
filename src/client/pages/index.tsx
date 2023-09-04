import React from "react";
import {gql, useQuery} from "@apollo/client";
import {TeamsGraph} from "../common/component/graph/TeamsGraph";
import {Team} from "../../graphql/generated/Resolver";

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

type IndexProps = {}

const Index: React.FC<IndexProps> = () => {

    const { data, loading, error } = useQuery<{ teams: Team[] } | undefined>(Query);

    return (
        <div>
            {data?.teams && <TeamsGraph teams={data.teams} title={"://Leaderboard"} showLegend={true}  />}
        </div>
    )
}

export default Index;