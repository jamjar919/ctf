import express from "express";
import * as dotenv from "dotenv";
import {ApolloServer} from "@apollo/server";
import {ExpressContextFunctionArgument, expressMiddleware} from '@apollo/server/express4';
import {ApolloServerPluginDrainHttpServer} from "@apollo/server/plugin/drainHttpServer";
import bodyParser from "body-parser";
import cors, { CorsRequest } from 'cors';
import http from "http";
import { readFileSync } from 'fs';

import {setupLogs} from "./util/setupLogs";
import {Context} from "../graphql/Context";
import {resolvers} from "./resolver/resolvers";
import {pingDatabase} from "./database/health/pingDatabase";

dotenv.config();
setupLogs();

const app = express();
const httpServer = http.createServer(app);
const port = process.env.PORT || 16000;

/**
 * GRAPHQL
 */
const typeDefs = readFileSync('./src/graphql/schema.graphql', { encoding: 'utf-8' });

const apolloServer = new ApolloServer<Context>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

// Wait for apollo to start up
await apolloServer.start();

app.use(
    '/graphql',
    cors<CorsRequest>(),
    bodyParser.json(),
    expressMiddleware(apolloServer, {
        context: async (integrationContext: ExpressContextFunctionArgument) => {
            const { req } = integrationContext;

            return {
                token: req.headers.token
            }
        },
    }),
);

/**
 * MONGO DB CONNECTION CHECK
 */
await pingDatabase();

// Startup
await new Promise<void>((resolve) => httpServer.listen(port, () => resolve()));
console.log(`🚀 Active on port ${port}!`);