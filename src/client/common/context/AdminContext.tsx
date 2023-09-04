import React, {useState} from "react";
import {getAdminCookie, setAdminCookie} from "../component/admin/AdminCookie";

type AdminContext = {
    isAdminModalOpen: boolean,
    toggleAdminModal: () => void,
    secret: string,
    updateSecret: (newSecret: string) => void,
    enableAdminTools: boolean
};

const Context = React.createContext<AdminContext>({} as any);

type AdminContextProps = React.PropsWithChildren<{}>

const AdminContextProvider: React.FC<AdminContextProps> = (props) => {
    const { children } = props;

    // Modal
    const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
    const toggleAdminModal = () => setIsAdminModalOpen(!isAdminModalOpen);

    // Secret
    const [secret, setSecret] = useState(getAdminCookie() ?? "")
    const updateSecret = (value: string) => {
        setAdminCookie(value);
        setSecret(value);
    }

    const enableAdminTools = secret.trim() !== "";

    const context: AdminContext = {
        isAdminModalOpen,
        toggleAdminModal,
        secret,
        updateSecret,
        enableAdminTools
    };

    return <Context.Provider value={context}>{children}</Context.Provider>;
};

const useAdminContext = () => React.useContext(Context);

export { AdminContextProvider, useAdminContext };
