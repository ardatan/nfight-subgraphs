const resolvers = {
  Fighter: {
    syncStatus: {
      selectionSet: "{ id }",
      resolve: async (root, args, context, info) => {
        const remoteArgs = {
          first: 1,
          orderBy: "timestamp",
          orderDirection: "desc",
          where: { fighter: id },
        };
        // Add timestamp to the selectionSet sent by the gateway
        const selectionSetFactory = (syncStatusSelectionSet) => /* GraphQL */ `
             {
                 ${syncStatusSelectionSet.selections
                   .map((selection) => selection.name.value)
                   .join("\n")}
                 timestamp
             }
        `;
        const results = await Promise.all([
          context.ownership.Query.syncStatuses({
            root,
            args: remoteArgs,
            selectionSet: selectionSetFactory,
            context,
            info,
          }),
          context.savestate.Query.SS_syncStatuses({
            root,
            args: remoteArgs,
            selectionSet: selectionSetFactory,
            context,
            info,
          }),
        ]);
        return results
          .flat()
          .sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1))[0];
      },
    },
  },
  SyncStatus: { // Not sure about the name of the type
    status: {
      selectionSet: "{ status }",
      resolve: (root) => root.status || "Unsynced",
    },
  },
};

module.exports = { resolvers };
