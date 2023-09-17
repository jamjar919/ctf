import React from "react";
import {TeamsGraph} from "../common/component/graph/team/TeamsGraph";
import {Legend} from "../common/component/team-list/Legend";
import {useCompetition} from "../common/query/UseCompetition";
import {FullscreenLoader} from "../common/component/fullscreen-loader/FullscreenLoader";
import {AdminHotCorner} from "../common/component/admin/admin-hot-corner/AdminHotCorner";
import {GetStaticPaths, GetStaticPropsContext, GetStaticPropsResult} from "next";
import {Competitions} from "../common/Competitions";
import {PageContext} from "../common/context/PageContext";

// Paths to prerender. This should be one per competition from the list we have set up.
// TODO this should call the GQL server.
export const getStaticPaths = (async () => {
    return {
        paths: Competitions.map(name =>({
            params: {
                competition: name
            },
        })),
        fallback: false,
    }
}) satisfies GetStaticPaths

export async function getStaticProps(
    context: GetStaticPropsContext
): Promise<GetStaticPropsResult<CompetitionPageStaticProps>> {
    const competition = String(context.params?.competition) ?? "";

    const graphQlHost = process.env.GRAPH_QL_HOST

    if (!graphQlHost) {
        throw new Error("No graphQl server configured, this should be set as an environment variable")
    }

    return {
        props: {
            competition,
            graphQlHost
        }
    }
}

type CompetitionPageStaticProps = CompetitionPageProps & {
    graphQlHost: string;
}

type CompetitionPageProps = {
    competition: string;
}

const CompetitionPageComponent: React.FC<CompetitionPageProps> = ({ competition }) =>  {

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

const CompetitionPage: React.FC<CompetitionPageStaticProps> = ({ competition, graphQlHost }) => {
    return (
        <PageContext graphQlHost={graphQlHost}>
            <CompetitionPageComponent competition={competition} />
        </PageContext>
    )
}

export default CompetitionPage;