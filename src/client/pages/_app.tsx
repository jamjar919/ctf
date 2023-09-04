import React from 'react';
import {AppComponent} from "next/dist/shared/lib/router/router";
import {ApolloProvider} from "@apollo/client";
import client from "../common/ApolloClient";
import {ModalManager} from "../common/component/modal/manager/ModalManager";
import {SelectContextProvider} from "../common/context/SelectContext";

import './app.scss'

const App: AppComponent = ({ Component, pageProps }) => {
    return (
        <ApolloProvider client={client}>
            <SelectContextProvider>
                <Component {...pageProps} />
                <ModalManager />
            </SelectContextProvider>
        </ApolloProvider>
    )
}

export default App;