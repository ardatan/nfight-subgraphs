# nFight subgraphs

2 graph protocol subgraphs, one each for Etheruem mainnet and Polygon.

The two subgraphs are stitched together and can be served as a gateway via [GraphQL Mesh](https://www.graphql-mesh.com/)

Both create a `Fighter` entity whose id is `${CONTRACT_ADDRESS}${TOKEN_ID}`

## nfight-ownership

The Ownership subgraph listens to the NFightParent contract. When a new project registers, we also being listening to `Transfer` events from that NFT contract. This allows us to maintain our own up-to-date index of L1 ownership for nFighters.

https://thegraph.com/hosted-service/subgraph/sbauch/nfight-ownership

## nfight-gamedata

The Gamedata subgraph indexes events from the Polygon child contract that update the current skill levels for an nFighter.

https://thegraph.com/hosted-service/subgraph/sbauch/nfight-gamedata

## nfight-mesh

Source code for a GraphQL Mesh gateway and Apollo server.

The mesh project allows us to intelligently combine query results from the separate subgraphs to create a single GraphQL API that returns merged data from Layer 1 and Layer 2 subgraphs.

https://nfight-stitch-graph.herokuapp.com/