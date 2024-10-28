import { ApolloServer } from "@apollo/server";
import { expressMiddleware as apolloMiddleware } from "@apollo/server/express4";
import cors from "cors";
import express from "express";
import { authMiddleware, handleLogin } from "./auth.js";
import { readFile } from "node:fs/promises";
import { resolvers } from "./resolvers.js";

const PORT = 9000;

const app = express();

/**
 * @method cors() -> adicionar header as requisições
 * @method express.json() -> adicionar o corpo da solicitação como um objeto
 * @param authMiddleware -> irá cuidar da autenticação
 */
app.use(cors(), express.json(), authMiddleware);

app.post("/login", handleLogin);

function getContext({ req }) {
  return { auth: req.auth };
}

/**
 * @param typeDefs irá definir o schema da nossa API
 * @import 'node:fs/promisses' irá ler o nosso arquivo de schema em utf-8 e assim conseguir ler
 */
const typeDefs = await readFile("./schema.graphql", "utf-8");
const apolloServer = new ApolloServer({ typeDefs, resolvers });
await apolloServer.start();

/**
 * @method app.use express irá encaminhar toda a requisição para o endpoint /graphql que irá encaminhar para o
 * @method apolloMiddleware
 * @param apolloServer que será integrado ao apolloServer
 */
app.use("/graphql", apolloMiddleware(apolloServer, { context: getContext }));

app.listen({ port: PORT }, () => {
  console.log(`\nServer running on port ${PORT}!!!`);
  console.log(
    `GraphQL Apollo is running on port: http://localhost:${PORT}/graphql`
  );
});
