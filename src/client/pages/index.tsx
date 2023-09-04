import React from "react";
import {TeamsGraph} from "../common/component/graph/team/TeamsGraph";
import {Legend} from "../common/component/team-list/Legend";
import {useTeams} from "../common/query/UseTeams";
import {FullscreenLoader} from "../common/component/fullscreen-loader/FullscreenLoader";

type IndexProps = {}

const Index: React.FC<IndexProps> = () => {

    const { data, loading, error } = useTeams();

    if (loading) {
        return <FullscreenLoader />
    }

    if (error || !data?.teams) {
        return <div>Error fetching points data. Go tell @james</div>
    }

    const { teams } = data;

    return (
        <div>
            <TeamsGraph teams={teams} title={"://Leaderboard"} />
            <Legend teams={teams} />
        </div>
    )
}

export default Index;