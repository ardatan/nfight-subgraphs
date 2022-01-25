const { buildSchema, Source } = require('graphql');

const source = new Source(/* GraphQL */`
schema {
  query: Query
  subscription: Subscription
}

directive @entity on OBJECT

directive @derivedFrom(field: String) on FIELD_DEFINITION

directive @subgraphId(id: String) on OBJECT

scalar BigDecimal

scalar BigInt

input Block_height {
  hash: Bytes
  number: Int
  number_gte: Int
}

scalar Bytes

type Fighter {
  id: ID!
  contractAddress: Bytes!
  tokenId: BigInt!
  aggression: BigInt!
  awareness: BigInt!
  determination: BigInt!
  power: BigInt!
  resilience: BigInt!
  speed: BigInt!
  aggregatePoints: BigInt!
  syncs(skip: Int = 0, first: Int = 100, orderBy: SyncStatus_orderBy, orderDirection: OrderDirection, where: SyncStatus_filter): [SyncStatus!]
}

input Fighter_filter {
  id: ID
  id_not: ID
  id_gt: ID
  id_lt: ID
  id_gte: ID
  id_lte: ID
  id_in: [ID!]
  id_not_in: [ID!]
  contractAddress: Bytes
  contractAddress_not: Bytes
  contractAddress_in: [Bytes!]
  contractAddress_not_in: [Bytes!]
  contractAddress_contains: Bytes
  contractAddress_not_contains: Bytes
  tokenId: BigInt
  tokenId_not: BigInt
  tokenId_gt: BigInt
  tokenId_lt: BigInt
  tokenId_gte: BigInt
  tokenId_lte: BigInt
  tokenId_in: [BigInt!]
  tokenId_not_in: [BigInt!]
  aggression: BigInt
  aggression_not: BigInt
  aggression_gt: BigInt
  aggression_lt: BigInt
  aggression_gte: BigInt
  aggression_lte: BigInt
  aggression_in: [BigInt!]
  aggression_not_in: [BigInt!]
  awareness: BigInt
  awareness_not: BigInt
  awareness_gt: BigInt
  awareness_lt: BigInt
  awareness_gte: BigInt
  awareness_lte: BigInt
  awareness_in: [BigInt!]
  awareness_not_in: [BigInt!]
  determination: BigInt
  determination_not: BigInt
  determination_gt: BigInt
  determination_lt: BigInt
  determination_gte: BigInt
  determination_lte: BigInt
  determination_in: [BigInt!]
  determination_not_in: [BigInt!]
  power: BigInt
  power_not: BigInt
  power_gt: BigInt
  power_lt: BigInt
  power_gte: BigInt
  power_lte: BigInt
  power_in: [BigInt!]
  power_not_in: [BigInt!]
  resilience: BigInt
  resilience_not: BigInt
  resilience_gt: BigInt
  resilience_lt: BigInt
  resilience_gte: BigInt
  resilience_lte: BigInt
  resilience_in: [BigInt!]
  resilience_not_in: [BigInt!]
  speed: BigInt
  speed_not: BigInt
  speed_gt: BigInt
  speed_lt: BigInt
  speed_gte: BigInt
  speed_lte: BigInt
  speed_in: [BigInt!]
  speed_not_in: [BigInt!]
  aggregatePoints: BigInt
  aggregatePoints_not: BigInt
  aggregatePoints_gt: BigInt
  aggregatePoints_lt: BigInt
  aggregatePoints_gte: BigInt
  aggregatePoints_lte: BigInt
  aggregatePoints_in: [BigInt!]
  aggregatePoints_not_in: [BigInt!]
  syncs: [String!]
  syncs_not: [String!]
  syncs_contains: [String!]
  syncs_not_contains: [String!]
}

enum Fighter_orderBy {
  id
  contractAddress
  tokenId
  aggression
  awareness
  determination
  power
  resilience
  speed
  aggregatePoints
  syncs
}

enum OrderDirection {
  asc
  desc
}

type Query {
  fighter(
    id: ID!
    """
    The block at which the query should be executed. Can either be a \`{ hash: Bytes }\` value containing a block hash, a \`{ number: Int }\` containing the block number, or a \`{ number_gte: Int }\` containing the minimum block number. In the case of \`number_gte\`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.
    """
    block: Block_height
    """
    Set to \`allow\` to receive data even if the subgraph has skipped over errors while syncing.
    """
    subgraphError: _SubgraphErrorPolicy_! = deny
  ): Fighter
  fighters(
    skip: Int = 0
    first: Int = 100
    orderBy: Fighter_orderBy
    orderDirection: OrderDirection
    where: Fighter_filter
    """
    The block at which the query should be executed. Can either be a \`{ hash: Bytes }\` value containing a block hash, a \`{ number: Int }\` containing the block number, or a \`{ number_gte: Int }\` containing the minimum block number. In the case of \`number_gte\`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.
    """
    block: Block_height
    """
    Set to \`allow\` to receive data even if the subgraph has skipped over errors while syncing.
    """
    subgraphError: _SubgraphErrorPolicy_! = deny
  ): [Fighter!]!
  syncStatus(
    id: ID!
    """
    The block at which the query should be executed. Can either be a \`{ hash: Bytes }\` value containing a block hash, a \`{ number: Int }\` containing the block number, or a \`{ number_gte: Int }\` containing the minimum block number. In the case of \`number_gte\`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.
    """
    block: Block_height
    """
    Set to \`allow\` to receive data even if the subgraph has skipped over errors while syncing.
    """
    subgraphError: _SubgraphErrorPolicy_! = deny
  ): SyncStatus
  syncStatuses(
    skip: Int = 0
    first: Int = 100
    orderBy: SyncStatus_orderBy
    orderDirection: OrderDirection
    where: SyncStatus_filter
    """
    The block at which the query should be executed. Can either be a \`{ hash: Bytes }\` value containing a block hash, a \`{ number: Int }\` containing the block number, or a \`{ number_gte: Int }\` containing the minimum block number. In the case of \`number_gte\`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.
    """
    block: Block_height
    """
    Set to \`allow\` to receive data even if the subgraph has skipped over errors while syncing.
    """
    subgraphError: _SubgraphErrorPolicy_! = deny
  ): [SyncStatus!]!
  """Access to subgraph metadata"""
  _meta(block: Block_height): _Meta_
}

type Subscription {
  fighter(
    id: ID!
    """
    The block at which the query should be executed. Can either be a \`{ hash: Bytes }\` value containing a block hash, a \`{ number: Int }\` containing the block number, or a \`{ number_gte: Int }\` containing the minimum block number. In the case of \`number_gte\`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.
    """
    block: Block_height
    """
    Set to \`allow\` to receive data even if the subgraph has skipped over errors while syncing.
    """
    subgraphError: _SubgraphErrorPolicy_! = deny
  ): Fighter
  fighters(
    skip: Int = 0
    first: Int = 100
    orderBy: Fighter_orderBy
    orderDirection: OrderDirection
    where: Fighter_filter
    """
    The block at which the query should be executed. Can either be a \`{ hash: Bytes }\` value containing a block hash, a \`{ number: Int }\` containing the block number, or a \`{ number_gte: Int }\` containing the minimum block number. In the case of \`number_gte\`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.
    """
    block: Block_height
    """
    Set to \`allow\` to receive data even if the subgraph has skipped over errors while syncing.
    """
    subgraphError: _SubgraphErrorPolicy_! = deny
  ): [Fighter!]!
  syncStatus(
    id: ID!
    """
    The block at which the query should be executed. Can either be a \`{ hash: Bytes }\` value containing a block hash, a \`{ number: Int }\` containing the block number, or a \`{ number_gte: Int }\` containing the minimum block number. In the case of \`number_gte\`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.
    """
    block: Block_height
    """
    Set to \`allow\` to receive data even if the subgraph has skipped over errors while syncing.
    """
    subgraphError: _SubgraphErrorPolicy_! = deny
  ): SyncStatus
  syncStatuses(
    skip: Int = 0
    first: Int = 100
    orderBy: SyncStatus_orderBy
    orderDirection: OrderDirection
    where: SyncStatus_filter
    """
    The block at which the query should be executed. Can either be a \`{ hash: Bytes }\` value containing a block hash, a \`{ number: Int }\` containing the block number, or a \`{ number_gte: Int }\` containing the minimum block number. In the case of \`number_gte\`, the query will be executed on the latest block only if the subgraph has progressed to or past the minimum block number. Defaults to the latest block when omitted.
    """
    block: Block_height
    """
    Set to \`allow\` to receive data even if the subgraph has skipped over errors while syncing.
    """
    subgraphError: _SubgraphErrorPolicy_! = deny
  ): [SyncStatus!]!
  """Access to subgraph metadata"""
  _meta(block: Block_height): _Meta_
}

type SyncStatus {
  id: ID!
  fighter: Fighter!
  timestamp: BigInt!
  status: SyncStatusEnum!
}

enum SyncStatusEnum {
  Unsynced
  Syncing
  Synced
}

input SyncStatus_filter {
  id: ID
  id_not: ID
  id_gt: ID
  id_lt: ID
  id_gte: ID
  id_lte: ID
  id_in: [ID!]
  id_not_in: [ID!]
  fighter: String
  fighter_not: String
  fighter_gt: String
  fighter_lt: String
  fighter_gte: String
  fighter_lte: String
  fighter_in: [String!]
  fighter_not_in: [String!]
  fighter_contains: String
  fighter_not_contains: String
  fighter_starts_with: String
  fighter_not_starts_with: String
  fighter_ends_with: String
  fighter_not_ends_with: String
  timestamp: BigInt
  timestamp_not: BigInt
  timestamp_gt: BigInt
  timestamp_lt: BigInt
  timestamp_gte: BigInt
  timestamp_lte: BigInt
  timestamp_in: [BigInt!]
  timestamp_not_in: [BigInt!]
  status: SyncStatusEnum
  status_not: SyncStatusEnum
  status_in: [SyncStatusEnum!]
  status_not_in: [SyncStatusEnum!]
}

enum SyncStatus_orderBy {
  id
  fighter
  timestamp
  status
}

type _Block_ {
  """The hash of the block"""
  hash: Bytes
  """The block number"""
  number: Int!
}

"""The type for the top-level _meta field"""
type _Meta_ {
  """
  Information about a specific subgraph block. The hash of the block
  will be null if the _meta field has a block constraint that asks for
  a block number. It will be filled if the _meta field has no block constraint
  and therefore asks for the latest  block
  
  """
  block: _Block_!
  """The deployment ID"""
  deployment: String!
  """If \`true\`, the subgraph encountered indexing errors at some past block"""
  hasIndexingErrors: Boolean!
}

enum _SubgraphErrorPolicy_ {
  """Data will be returned even if the subgraph has indexing errors"""
  allow
  """
  If the subgraph has indexing errors, data will be omitted. The default.
  """
  deny
}
`, `.mesh/sources/savestate/schema.graphql`);

module.exports = buildSchema(source, {
  assumeValid: true,
  assumeValidSDL: true
});