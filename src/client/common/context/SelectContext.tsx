import React, {useState} from "react";

type SelectContext = {
    selectedTeamIds: string[]
    selectTeam: (teamId: string) => void,
    deselectTeam: (teamId: string) => void,
    toggleTeam: (teamId: string) => void,
    isTeamSelected: (teamId: string) => boolean,
};

const Context = React.createContext<SelectContext>({} as any);

type SelectContextProps = React.PropsWithChildren<{}>

const SelectContextProvider: React.FC<SelectContextProps> = (props) => {
    const { children } = props;

    const [selectedTeamIds, setSelectedTeamIds] = useState<Set<string>>(new Set());

    const isTeamSelected = (teamId: string): boolean => selectedTeamIds.has(teamId);

    const selectTeam = (teamId: string): void => {
        setSelectedTeamIds((oldSet: Set<string>) => {
            const newSet = new Set(oldSet);
            newSet.add(teamId);
            return newSet;
        });
    }

    const deselectTeam = (teamId: string): void => {
        setSelectedTeamIds((oldSet: Set<string>) => {
            const newSet = new Set(oldSet);
            newSet.delete(teamId);
            return newSet;
        });
    }

    const toggleTeam = (teamId: string): void => {
        if (isTeamSelected(teamId)) {
            deselectTeam(teamId);
            return;
        }

        selectTeam(teamId);
    }

    const context: SelectContext = {
        selectedTeamIds: Array.from(selectedTeamIds),
        selectTeam,
        deselectTeam,
        toggleTeam,
        isTeamSelected,
    };

    return <Context.Provider value={context}>{children}</Context.Provider>;
};

const useSelectContext = () => React.useContext(Context);

export { SelectContextProvider, useSelectContext };
