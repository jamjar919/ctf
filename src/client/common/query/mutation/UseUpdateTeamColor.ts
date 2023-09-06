import {gql, useMutation} from "@apollo/client";
import {TeamFragment} from "../fragment/TeamFragment";
import {Team} from "../../../../graphql/generated/Resolver";
import {FETCH_ALL_TEAMS_QUERY} from "../UseTeams";
import {FETCH_TEAM_QUERY} from "../UseTeam";

const Query = gql`
    ${TeamFragment}
    mutation UpdateTeamColor($id: ID!, $newColor: String!) {
        updateTeamColor(id: $id, newColor: $newColor) {
            ...TeamProperties
        }
    }
`

const useUpdateTeamColor = () => useMutation(Query, {
    refetchQueries: [
        FETCH_ALL_TEAMS_QUERY,
        FETCH_TEAM_QUERY
    ],
    update: (cache, { data: { updateTeamColor } }) => {
        cache.modify({
            fields: {
                teams: (existingTeams: Team[] = []) => {
                    const newTeamRef = cache.writeFragment({
                        data: updateTeamColor,
                        fragment: gql`${TeamFragment}`
                    });

                    return [
                        ...existingTeams.filter((t) => t.id !== updateTeamColor.id),
                        newTeamRef
                    ]
                }
            }
        })
    },
});

export { useUpdateTeamColor }