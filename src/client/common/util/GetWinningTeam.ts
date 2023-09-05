import {Team} from "../../../graphql/generated/Resolver";

const getWinningTeam = (teams: Team[]): Team | null => {
    if (teams.length === 0) {
        return null;
    }

    if (teams.length === 1) {
        return teams[0];
    }

    return teams.reduce((currentBest: Team | null, team: Team): Team => {

        const currentBestPoints = currentBest?.score?.total ?? 0;

        if ((team.score?.total ?? 0) > currentBestPoints) {
            return team;
        }

        return team;
    }, null)
};

export { getWinningTeam }