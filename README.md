# nFight subgraphs

2 graph protocol subgraphs, one each for Etheruem mainnet and Polygon.

The two subgraphs are stitched together and can be served as a gateway via [GraphQL Mesh](https://www.graphql-mesh.com/)

Both subgraphs persist a `Fighter` entity whose id is `${CONTRACT_ADDRESS}${TOKEN_ID}` and one-to-many `SyncStatus` entities.

`Fighter` attributes are merged seamlessly, allowing developers to make a single GraphQL query from their client and receive data from both L1 and L2 for that entity.

Both subgraphs create `SyncStatus` entities associated with a `Fighter`. The most recent `SyncStatus` will report whether Layer 1 ownership data is synced to the Layer 2 protocol.

This data should not be used alone on the Layer 2, but is intended to be used on your frontend.

- `Synced`: ownership data on L2 matches ownership data on L1
- `Syncing`: ownership data on L2 does not match L1, but the function to sync the data has been called - data will typically sync between chains in 15 minutes via Polygon's fxPortal
- `Unsynced`: ownership data on L2 does not match L1, and the user or developer should call the function to sync data. This happens when an L1 token is transferred - ownership data must then be broadcast to L2.

You should only query the **un-prefixed** entities - the prefixed entities are specific to a subgraph and will not return stitched data.

## nfight-ownership

The Ownership subgraph listens to the NFightParent contract. When a new project registers, we also being listening to `Transfer` events from that NFT contract. This allows us to maintain our own up-to-date index of L1 ownership for nFighters.

https://thegraph.com/hosted-service/subgraph/sbauch/nfight-ownership

## nfight-gamedata

The Gamedata subgraph indexes events from the Polygon child contract that update the current skill levels for an nFighter.

https://thegraph.com/hosted-service/subgraph/sbauch/nfight-gamedata

## nfight-mesh

Source code for a GraphQL Mesh gateway and Apollo server.

The mesh project allows us to intelligently combine query results from the separate subgraphs to create a single GraphQL API that returns merged data from Layer 1 and Layer 2 subgraphs.

Note that we are using `patch-package` to edit the `@graphql-mesh/graphql` package. This change is very specific to how we are stitching graphs and may not work for other use cases.

On heroku, we use the `heroku-cleanup` task to patch the mesh package.

https://nfight-stitch-graph.herokuapp.com/

## example queries

Fetch nFighter by ID:

```gql
  query getFighter($id: ID! = "0xb3ea7cbb180d834c279b06873b6a971cce7014681") {
    fighter(id: $id) {
      id # L1 subgraph fields
      owner
      contractAddress
      tokenId
      aggregatePoints # L2 subgraph fields
      aggression
      awareness
      determination
      resilience
      power
      speed
      syncs(orderBy: timestamp, first: 1, orderDirection: desc) { # One-to-many entity on both L1 and L2
        status
      }
    }
  }
```

Fetch nFighters owned by an address (NB: ensure you downcase the address!)

```gql
  query getFightersForAddress($address: Bytes! = "0xc102f76973f4890cab1b5d1ed26f3623381983af") {
    fighters(where: { owner: $address }) {
      id # L1 subgraph fields
      owner
      contractAddress
      tokenId
      aggregatePoints # L2 subgraph fields
      aggression
      awareness
      determination
      resilience
      power
      speed
      syncs(orderBy: timestamp, first: 1, orderDirection: desc) { # One-to-many entity on both L1 and L2
        status
      }
    }
  }
```