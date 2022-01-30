const mergeSyncs = async (root, args, context, info) => {

  const parent = await context.ownership.Query.syncStatuses({
      root,
      args: { first: 1, orderBy: 'timestamp', orderDirection: 'desc', where: { fighter: root.id }},
      context,
      info,
      selectionSet: `{ id timestamp status }`

    });

  const child = await context.savestate.Query.SS_syncStatuses({
    root,
    args: { first: 1, orderBy: 'timestamp', orderDirection: 'desc', where: { fighter: root.id }},
    context,
    info,
    selectionSet: `{ id timestamp status }`
  });

  const latest = [...(child.length ? child : []), ...(parent.length ? parent : [])].sort((a,b) => a.timestamp < b.timestamp ? 1 : -1)[0];

  return latest;
};

const latestSync = async (root, args, context, info) => {
  console.warn("ID", root.id)
  const latest = await mergeSyncs(root, args, context, info);
  console.warn("LATEST", latest)
  return latest.status || 'Unsynced';
}


const resolvers = {
  Fighter: {
    syncStatus: mergeSyncs,
    syncStatusString: latestSync
  },
};

  module.exports = { resolvers };