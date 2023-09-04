import React from 'react';
import {AppComponent} from "next/dist/shared/lib/router/router";
import {ApolloProvider} from "@apollo/client";
import client from "../common/ApolloClient";
import {ModalManager} from "../common/component/modal/manager/ModalManager";
import {SelectContextProvider} from "../common/context/SelectContext";
import {AdminContextProvider} from "../common/context/AdminContext";

import './app.scss'

const App: AppComponent = ({ Component, pageProps }) => {
    return (
        <ApolloProvider client={client}>
            <SelectContextProvider>
                <AdminContextProvider>
                    <Component {...pageProps} />
                    <ModalManager />
                </AdminContextProvider>
            </SelectContextProvider>
        </ApolloProvider>
    )
}

export default App;