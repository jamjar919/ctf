import React from "react";
import {TeamsGraph} from "../common/component/graph/team/TeamsGraph";
import {Legend} from "../common/component/team-list/Legend";
import {useCompetition} from "../common/query/UseCompetition";
import {FullscreenLoader} from "../common/component/fullscreen-loader/FullscreenLoader";
import {AdminHotCorner} from "../common/component/admin/admin-hot-corner/AdminHotCorner";
import {GetStaticPaths} from "next";

export const getStaticPaths = (async () => {
    return {
        paths: [
            {
                params: {
                    competition: "test"
                },
            },
        ],
        fallback: true,
    }
}) satisfies GetStaticPaths

// This also gets called at build time
export async function getStaticProps({ params }: { params: Record<string, string> }) {
    const competition = params.competition ?? "";

    // Pass post data to the page via props
    return { props: { competition } }
}

type CompetitionPageProps = {
    competition: string;
}

const CompetitionPage: React.FC<CompetitionPageProps> = ({ competition }) =>  {

    const { data, loading, error } = useCompetition(competition!);

    if (loading) {
        return <FullscreenLoader />
    }

    if (error || !data?.competition.teams) {
        return <div>Error fetching points data. Go tell @james</div>
    }

    const {
        competition: {
            start,
            end,
            teams
        }
    } = data;

    return (
        <div>
            <TeamsGraph
                title={"://Leaderboard"}
                teams={teams}
                start={start}
                end={end}
            />
            <Legend teams={teams} />
            <AdminHotCorner />
        </div>
    )
}

export default CompetitionPage;