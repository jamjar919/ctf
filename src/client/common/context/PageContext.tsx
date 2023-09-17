import React, {PropsWithChildren, useMemo} from "react";
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
    const client = useMemo(
        () => getApolloClient(graphQlHost),
        [graphQlHost]
    )

    return (
        <ApolloProvider client={client}>
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