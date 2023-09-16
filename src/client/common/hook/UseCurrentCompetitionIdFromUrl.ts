import {useRouter} from "next/router";

const useCurrentCompetitionIdFromUrl = () => {
    const {
        query: {
            competition
        }
    } = useRouter();

    return String(competition);
}

export { useCurrentCompetitionIdFromUrl };
