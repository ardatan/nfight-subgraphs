const { ApolloServer } = require('apollo-server');
const {
  ApolloServerPluginLandingPageGraphQLPlayground
} = require("apollo-server-core");

const myPlugin = {
  // Fires whenever a GraphQL request is received from a client.
  async requestDidStart(requestContext) {
    console.log('Request started! Query:\n' +
      requestContext.request.query);

    return {
      // Fires whenever Apollo Server will parse a GraphQL
      // request to create its associated document AST.
      async parsingDidStart(requestContext) {
        console.log('Parsing started!');
      },

      // Fires whenever Apollo Server will validate a
      // request's document AST against your GraphQL schema.
      async validationDidStart(requestContext) {
        console.log('Validation started!');
      },

    }
  },
};

module.exports = async ({ getBuiltMesh, documents, logger }) => {
  console.warn(documents)
  const { schema } = await getBuiltMesh();
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }) => req,
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground,
      myPlugin
    ],
    introspection: true,
    documents,
  });

  const { url } = await apolloServer.listen(process.env.PORT || 4000);
  logger.info(`🚀 Server ready at ${url}`);
};