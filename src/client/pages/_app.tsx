import React from 'react';
import {AppComponent} from "next/dist/shared/lib/router/router";
import {ApolloProvider} from "@apollo/client";
import client from "../common/ApolloClient";

import './app.scss'

const App: AppComponent = ({ Component, pageProps }) => {
    return (
        <ApolloProvider client={client}>
            <Component {...pageProps} />
        </ApolloProvider>
    )
}

export default App;