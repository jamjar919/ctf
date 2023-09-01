import {Team} from "../../../graphql/generated/Resolver";

const getWinningTeam = (teams: Team[]) => teams.reduce((team, currentBest) => {
    const teamPoints: number = team?.points.reduce((a,b) => a + b.adjustment, 0) ?? 0;
    const currentBestPoints: number = currentBest?.points.reduce((a,b) => a + b.adjustment, 0) ?? 0;

    if (teamPoints > currentBestPoints) {
        return team;
    }

    return currentBest;
}, null);

export { getWinningTeam }