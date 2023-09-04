import React from "react";
import {gql, useQuery} from "@apollo/client";
import {TeamsGraph} from "../common/component/graph/TeamsGraph";
import {Team} from "../../graphql/generated/Resolver";
import {Legend} from "../common/component/team-list/Legend";
import {useTeams} from "../common/query/UseTeams";

type IndexProps = {}

const Index: React.FC<IndexProps> = () => {

    const { data, loading, error } = useTeams();

    return (
        <div>
            {data?.teams && (
                <>
                    <TeamsGraph teams={data.teams} title={"://Leaderboard"} />
                    <Legend teams={data.teams} />
                </>
            )}
        </div>
    )
}

export default Index;