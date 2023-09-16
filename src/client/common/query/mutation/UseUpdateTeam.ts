import {gql, useMutation} from "@apollo/client";
import {TeamFragment} from "../fragment/TeamFragment";
import {Team} from "../../../../graphql/generated/Resolver";
import {FETCH_COMPETITION_QUERY} from "../UseCompetition";
import {FETCH_TEAM_QUERY} from "../UseTeam";

const Query = gql`
    ${TeamFragment}
    mutation UpdateTeam($id: ID!, $newName: String! , $newColor: String!) {
        updateTeam(id: $id, newName: $newName, newColor: $newColor) {
            ...TeamProperties
        }
    }
`

const useUpdateTeam = () => useMutation(Query, {
    refetchQueries: [
        FETCH_COMPETITION_QUERY,
        FETCH_TEAM_QUERY
    ],
    update: (cache, { data: { updateTeam } }) => {
        cache.modify({
            fields: {
                teams: (existingTeams: Team[] = []) => {
                    const newTeamRef = cache.writeFragment({
                        data: updateTeam,
                        fragment: gql`${TeamFragment}`
                    });

                    return [
                        ...existingTeams.filter((t) => t.id !== updateTeam.id),
                        newTeamRef
                    ]
                }
            }
        })
    },
});

export { useUpdateTeam }