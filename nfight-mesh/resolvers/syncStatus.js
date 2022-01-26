const mergeSyncs = async (root, args, context, info) => {

  const parent = await context.ownership.Query.syncStatuses({
    root,
    args,
    context,
    info,
  });

  const child = await context.savestate.Query.syncStatuses({
    root,
    args,
    context,
    info,
  });

  const sorted = [...child, ...parent].sort((a,b) => a.timestamp < b.timestamp ? 1 : -1).slice(0, args.first || 1);

  return sorted;
};

const resolvers = {
  Fighter: {
    syncStatuses: mergeSyncs
  },
  Query: {
    syncStatuses: mergeSyncs
  }
};

  module.exports = { resolvers };