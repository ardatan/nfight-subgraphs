const { ApolloServer } = require('apollo-server');
const {
  ApolloServerPluginLandingPageGraphQLPlayground
} = require("apollo-server-core");

module.exports = async ({ getBuiltMesh, documents, logger }) => {
  const { schema } = await getBuiltMesh();
  const apolloServer = new ApolloServer({
    schema,
    context: ({ req }) => req,
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground
    ],
    introspection: true,
  });

  const { url } = await apolloServer.listen(process.env.PORT || 4000);
  logger.info(`🚀 Server ready at ${url}`);
};