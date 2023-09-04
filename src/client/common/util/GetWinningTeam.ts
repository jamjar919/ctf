import {Team} from "../../../graphql/generated/Resolver";

const getWinningTeam = (teams: Team[]): Team | null => {
    if (teams.length === 0) {
        return null;
    }

    if (teams.length === 1) {
        return teams[0];
    }

    return teams.reduce((team, currentBest) => {
        const currentBestPoints = currentBest?.score?.total ?? 0;

        if (team?.score?.total > currentBestPoints) {
            return team;
        }

        return currentBest;
    }, null)
};

export { getWinningTeam }