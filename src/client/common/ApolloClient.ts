import { ApolloClient, InMemoryCache } from "@apollo/client";
import {getAdminCookie} from "./component/admin/AdminCookie";

const client = new ApolloClient({
    uri: "http://localhost:16000/graphql",
    cache: new InMemoryCache(),
    headers: {
        token: getAdminCookie() ?? ""
    }
});

export default client;