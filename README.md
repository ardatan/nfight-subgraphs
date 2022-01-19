# nFight subgraphs

2 graph protocol subgraphs, one each for Etheruem mainnet and Polygon.

The goal is to allow these sources to be stitched for unified cross-chain data for queries.

Both create a `Fighter` entity whose id is `${CONTRACT_ADDRESS}${TOKEN_ID}`

The Ownership subgraph listens to the NFightParent contract. When a enw project registers, we also being listening to `Transfer` events from that NFT contract. This allows us to maintain our own up-to-date index of L1 ownership for nFighters.

The Gamedata subgraph indexes events from the Polygon child contract that update the current skill levels for an nFighter.

• https://thegraph.com/hosted-service/subgraph/sbauch/nfight-ownership
• https://thegraph.com/hosted-service/subgraph/sbauch/nfight-gamedata