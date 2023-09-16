import React from 'react';
import {AppComponent} from "next/dist/shared/lib/router/router";
import {ApolloProvider} from "@apollo/client";
import client from "../common/ApolloClient";
import {ModalManager} from "../common/component/modal/manager/ModalManager";
import {SelectContextProvider} from "../common/context/SelectContext";
import {AdminContextProvider} from "../common/context/AdminContext";

import './app.scss'

export async function generateStaticParams() {
    // const competitions: Competition[] = await fetch('http://localhost:16000', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ query: FETCH_COMPETITIONS_QUERY }),
    // })
    // .then(res => res.json());
    //
    // console.log(competitions);
    //
    // return competitions.map((competition: Competition) => ({
    //     competition: competition.id,
    // }))

    return Promise.resolve([{
        competition: "test"
    }]);
}

const App: AppComponent = ({ children }) => {
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

export default App;