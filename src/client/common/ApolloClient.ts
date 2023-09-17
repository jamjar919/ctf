import { ApolloClient, InMemoryCache } from "@apollo/client";
import {getAdminCookie} from "./component/admin/AdminCookie";

const getApolloClient = (uri: string) => new ApolloClient({
    uri,
    cache: new InMemoryCache(),
    headers: {
        token: getAdminCookie() ?? ""
    }
});

export { getApolloClient };