import React, {PropsWithChildren} from "react";
import {getApolloClient} from "../ApolloClient";
import {ApolloProvider} from "@apollo/client";
import {ModalManager} from "../component/modal/manager/ModalManager";
import {AdminContextProvider} from "./AdminContext";
import {SelectContextProvider} from "./SelectContext";

type PageContextProps = PropsWithChildren<{
    graphQlHost: string
}>

const PageContext: React.FC<PageContextProps> = ({
    children,
    graphQlHost
}) => {
    return (
        <ApolloProvider client={getApolloClient(graphQlHost)}>
            <SelectContextProvider>
                <AdminContextProvider>
                    {children}
                    <ModalManager />
                </AdminContextProvider>
            </SelectContextProvider>
        </ApolloProvider>
    )
}

export { PageContext }