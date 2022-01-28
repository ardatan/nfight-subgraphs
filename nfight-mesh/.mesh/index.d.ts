import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { GraphQLSchema } from 'graphql';
import { DocumentNode } from 'graphql';
import { CompilerOptions } from 'graphql-jit';
export declare type Maybe<T> = T | null;
export declare type InputMaybe<T> = Maybe<T>;
export declare type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
export declare type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export declare type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
export declare type RequireFields<T, K extends keyof T> = {
    [X in Exclude<keyof T, K>]?: T[X];
} & {
    [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export declare type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    BigDecimal: any;
    BigInt: any;
    Bytes: any;
};
export declare type Query = {
    nftproject?: Maybe<NFTProject>;
    nftprojects: Array<NFTProject>;
    fighter?: Maybe<Fighter>;
    fighters: Array<Fighter>;
    syncStatus?: Maybe<SyncStatus>;
    syncStatuses: Array<SyncStatus>;
    /** Access to subgraph metadata */
    _meta?: Maybe<_Meta_>;
};
export declare type QuerynftprojectArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type QuerynftprojectsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<NFTProject_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<NFTProject_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type QueryfighterArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type QueryfightersArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Fighter_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<Fighter_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type QuerysyncStatusArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type QuerysyncStatusesArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SyncStatus_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<SyncStatus_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type Query_metaArgs = {
    block?: InputMaybe<Block_height>;
};
export declare type Subscription = {
    nftproject?: Maybe<NFTProject>;
    nftprojects: Array<NFTProject>;
    fighter?: Maybe<Fighter>;
    fighters: Array<Fighter>;
    syncStatus?: Maybe<SyncStatus>;
    syncStatuses: Array<SyncStatus>;
    /** Access to subgraph metadata */
    _meta?: Maybe<_Meta_>;
};
export declare type SubscriptionnftprojectArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type SubscriptionnftprojectsArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<NFTProject_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<NFTProject_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type SubscriptionfighterArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type SubscriptionfightersArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<Fighter_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<Fighter_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type SubscriptionsyncStatusArgs = {
    id: Scalars['ID'];
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type SubscriptionsyncStatusesArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SyncStatus_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<SyncStatus_filter>;
    block?: InputMaybe<Block_height>;
    subgraphError?: _SubgraphErrorPolicy_;
};
export declare type Subscription_metaArgs = {
    block?: InputMaybe<Block_height>;
};
export declare type Block_height = {
    hash?: InputMaybe<Scalars['Bytes']>;
    number?: InputMaybe<Scalars['Int']>;
    number_gte?: InputMaybe<Scalars['Int']>;
};
export declare type Fighter = {
    id: Scalars['ID'];
    contractAddress: Scalars['Bytes'];
    owner: Scalars['Bytes'];
    tokenId: Scalars['BigInt'];
    syncStatuses?: Maybe<Array<SyncStatus>>;
    aggression: Scalars['BigInt'];
    awareness: Scalars['BigInt'];
    determination: Scalars['BigInt'];
    power: Scalars['BigInt'];
    resilience: Scalars['BigInt'];
    speed: Scalars['BigInt'];
    aggregatePoints: Scalars['BigInt'];
    syncStatus: SyncStatus;
    syncStatusString: Scalars['String'];
};
export declare type FightersyncStatusesArgs = {
    skip?: InputMaybe<Scalars['Int']>;
    first?: InputMaybe<Scalars['Int']>;
    orderBy?: InputMaybe<SyncStatus_orderBy>;
    orderDirection?: InputMaybe<OrderDirection>;
    where?: InputMaybe<SyncStatus_filter>;
};
export declare type Fighter_filter = {
    id?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    contractAddress?: InputMaybe<Scalars['Bytes']>;
    contractAddress_not?: InputMaybe<Scalars['Bytes']>;
    contractAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
    contractAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
    contractAddress_contains?: InputMaybe<Scalars['Bytes']>;
    contractAddress_not_contains?: InputMaybe<Scalars['Bytes']>;
    owner?: InputMaybe<Scalars['Bytes']>;
    owner_not?: InputMaybe<Scalars['Bytes']>;
    owner_in?: InputMaybe<Array<Scalars['Bytes']>>;
    owner_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
    owner_contains?: InputMaybe<Scalars['Bytes']>;
    owner_not_contains?: InputMaybe<Scalars['Bytes']>;
    tokenId?: InputMaybe<Scalars['BigInt']>;
    tokenId_not?: InputMaybe<Scalars['BigInt']>;
    tokenId_gt?: InputMaybe<Scalars['BigInt']>;
    tokenId_lt?: InputMaybe<Scalars['BigInt']>;
    tokenId_gte?: InputMaybe<Scalars['BigInt']>;
    tokenId_lte?: InputMaybe<Scalars['BigInt']>;
    tokenId_in?: InputMaybe<Array<Scalars['BigInt']>>;
    tokenId_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    aggression?: InputMaybe<Scalars['BigInt']>;
    aggression_not?: InputMaybe<Scalars['BigInt']>;
    aggression_gt?: InputMaybe<Scalars['BigInt']>;
    aggression_lt?: InputMaybe<Scalars['BigInt']>;
    aggression_gte?: InputMaybe<Scalars['BigInt']>;
    aggression_lte?: InputMaybe<Scalars['BigInt']>;
    aggression_in?: InputMaybe<Array<Scalars['BigInt']>>;
    aggression_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    awareness?: InputMaybe<Scalars['BigInt']>;
    awareness_not?: InputMaybe<Scalars['BigInt']>;
    awareness_gt?: InputMaybe<Scalars['BigInt']>;
    awareness_lt?: InputMaybe<Scalars['BigInt']>;
    awareness_gte?: InputMaybe<Scalars['BigInt']>;
    awareness_lte?: InputMaybe<Scalars['BigInt']>;
    awareness_in?: InputMaybe<Array<Scalars['BigInt']>>;
    awareness_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    determination?: InputMaybe<Scalars['BigInt']>;
    determination_not?: InputMaybe<Scalars['BigInt']>;
    determination_gt?: InputMaybe<Scalars['BigInt']>;
    determination_lt?: InputMaybe<Scalars['BigInt']>;
    determination_gte?: InputMaybe<Scalars['BigInt']>;
    determination_lte?: InputMaybe<Scalars['BigInt']>;
    determination_in?: InputMaybe<Array<Scalars['BigInt']>>;
    determination_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    power?: InputMaybe<Scalars['BigInt']>;
    power_not?: InputMaybe<Scalars['BigInt']>;
    power_gt?: InputMaybe<Scalars['BigInt']>;
    power_lt?: InputMaybe<Scalars['BigInt']>;
    power_gte?: InputMaybe<Scalars['BigInt']>;
    power_lte?: InputMaybe<Scalars['BigInt']>;
    power_in?: InputMaybe<Array<Scalars['BigInt']>>;
    power_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    resilience?: InputMaybe<Scalars['BigInt']>;
    resilience_not?: InputMaybe<Scalars['BigInt']>;
    resilience_gt?: InputMaybe<Scalars['BigInt']>;
    resilience_lt?: InputMaybe<Scalars['BigInt']>;
    resilience_gte?: InputMaybe<Scalars['BigInt']>;
    resilience_lte?: InputMaybe<Scalars['BigInt']>;
    resilience_in?: InputMaybe<Array<Scalars['BigInt']>>;
    resilience_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    speed?: InputMaybe<Scalars['BigInt']>;
    speed_not?: InputMaybe<Scalars['BigInt']>;
    speed_gt?: InputMaybe<Scalars['BigInt']>;
    speed_lt?: InputMaybe<Scalars['BigInt']>;
    speed_gte?: InputMaybe<Scalars['BigInt']>;
    speed_lte?: InputMaybe<Scalars['BigInt']>;
    speed_in?: InputMaybe<Array<Scalars['BigInt']>>;
    speed_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    aggregatePoints?: InputMaybe<Scalars['BigInt']>;
    aggregatePoints_not?: InputMaybe<Scalars['BigInt']>;
    aggregatePoints_gt?: InputMaybe<Scalars['BigInt']>;
    aggregatePoints_lt?: InputMaybe<Scalars['BigInt']>;
    aggregatePoints_gte?: InputMaybe<Scalars['BigInt']>;
    aggregatePoints_lte?: InputMaybe<Scalars['BigInt']>;
    aggregatePoints_in?: InputMaybe<Array<Scalars['BigInt']>>;
    aggregatePoints_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};
export declare type Fighter_orderBy = 'id' | 'contractAddress' | 'owner' | 'tokenId' | 'syncStatuses' | 'aggression' | 'awareness' | 'determination' | 'power' | 'resilience' | 'speed' | 'aggregatePoints';
export declare type NFTProject = {
    id: Scalars['ID'];
    contractAddress: Scalars['Bytes'];
};
export declare type NFTProject_filter = {
    id?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    contractAddress?: InputMaybe<Scalars['Bytes']>;
    contractAddress_not?: InputMaybe<Scalars['Bytes']>;
    contractAddress_in?: InputMaybe<Array<Scalars['Bytes']>>;
    contractAddress_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
    contractAddress_contains?: InputMaybe<Scalars['Bytes']>;
    contractAddress_not_contains?: InputMaybe<Scalars['Bytes']>;
};
export declare type NFTProject_orderBy = 'id' | 'contractAddress';
export declare type OrderDirection = 'asc' | 'desc';
export declare type SyncStatus = {
    id: Scalars['ID'];
    fighter: Fighter;
    timestamp: Scalars['BigInt'];
    status: SyncStatusEnum;
};
export declare type SyncStatusEnum = 'Unsynced' | 'Syncing' | 'Synced';
export declare type SyncStatus_filter = {
    id?: InputMaybe<Scalars['ID']>;
    id_not?: InputMaybe<Scalars['ID']>;
    id_gt?: InputMaybe<Scalars['ID']>;
    id_lt?: InputMaybe<Scalars['ID']>;
    id_gte?: InputMaybe<Scalars['ID']>;
    id_lte?: InputMaybe<Scalars['ID']>;
    id_in?: InputMaybe<Array<Scalars['ID']>>;
    id_not_in?: InputMaybe<Array<Scalars['ID']>>;
    fighter?: InputMaybe<Scalars['String']>;
    fighter_not?: InputMaybe<Scalars['String']>;
    fighter_gt?: InputMaybe<Scalars['String']>;
    fighter_lt?: InputMaybe<Scalars['String']>;
    fighter_gte?: InputMaybe<Scalars['String']>;
    fighter_lte?: InputMaybe<Scalars['String']>;
    fighter_in?: InputMaybe<Array<Scalars['String']>>;
    fighter_not_in?: InputMaybe<Array<Scalars['String']>>;
    fighter_contains?: InputMaybe<Scalars['String']>;
    fighter_not_contains?: InputMaybe<Scalars['String']>;
    fighter_starts_with?: InputMaybe<Scalars['String']>;
    fighter_not_starts_with?: InputMaybe<Scalars['String']>;
    fighter_ends_with?: InputMaybe<Scalars['String']>;
    fighter_not_ends_with?: InputMaybe<Scalars['String']>;
    timestamp?: InputMaybe<Scalars['BigInt']>;
    timestamp_not?: InputMaybe<Scalars['BigInt']>;
    timestamp_gt?: InputMaybe<Scalars['BigInt']>;
    timestamp_lt?: InputMaybe<Scalars['BigInt']>;
    timestamp_gte?: InputMaybe<Scalars['BigInt']>;
    timestamp_lte?: InputMaybe<Scalars['BigInt']>;
    timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
    timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
    status?: InputMaybe<SyncStatusEnum>;
    status_not?: InputMaybe<SyncStatusEnum>;
    status_in?: InputMaybe<Array<SyncStatusEnum>>;
    status_not_in?: InputMaybe<Array<SyncStatusEnum>>;
};
export declare type SyncStatus_orderBy = 'id' | 'fighter' | 'timestamp' | 'status';
export declare type _Block_ = {
    /** The hash of the block */
    hash?: Maybe<Scalars['Bytes']>;
    /** The block number */
    number: Scalars['Int'];
};
/** The type for the top-level _meta field */
export declare type _Meta_ = {
    /**
     * Information about a specific subgraph block. The hash of the block
     * will be null if the _meta field has a block constraint that asks for
     * a block number. It will be filled if the _meta field has no block constraint
     * and therefore asks for the latest  block
     *
     */
    block: _Block_;
    /** The deployment ID */
    deployment: Scalars['String'];
    /** If `true`, the subgraph encountered indexing errors at some past block */
    hasIndexingErrors: Scalars['Boolean'];
};
export declare type _SubgraphErrorPolicy_ = 
/** Data will be returned even if the subgraph has indexing errors */
'allow'
/** If the subgraph has indexing errors, data will be omitted. The default. */
 | 'deny';
export declare type WithIndex<TObject> = TObject & Record<string, any>;
export declare type ResolversObject<TObject> = WithIndex<TObject>;
export declare type ResolverTypeWrapper<T> = Promise<T> | T;
export declare type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export declare type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
    fragment: string;
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export declare type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
    selectionSet: string;
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export declare type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export declare type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs> | StitchingResolver<TResult, TParent, TContext, TArgs>;
export declare type ResolverFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => Promise<TResult> | TResult;
export declare type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;
export declare type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;
export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<{
        [key in TKey]: TResult;
    }, TParent, TContext, TArgs>;
    resolve?: SubscriptionResolveFn<TResult, {
        [key in TKey]: TResult;
    }, TContext, TArgs>;
}
export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
    resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}
export declare type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> = SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs> | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;
export declare type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> = ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>) | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;
export declare type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (parent: TParent, context: TContext, info: GraphQLResolveInfo) => Maybe<TTypes> | Promise<Maybe<TTypes>>;
export declare type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;
export declare type NextResolverFn<T> = () => Promise<T>;
export declare type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (next: NextResolverFn<TResult>, parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;
/** Mapping between all available schema types and the resolvers types */
export declare type ResolversTypes = ResolversObject<{
    Query: ResolverTypeWrapper<{}>;
    Subscription: ResolverTypeWrapper<{}>;
    BigDecimal: ResolverTypeWrapper<Scalars['BigDecimal']>;
    BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
    Block_height: Block_height;
    Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
    Bytes: ResolverTypeWrapper<Scalars['Bytes']>;
    Fighter: ResolverTypeWrapper<Fighter>;
    Fighter_filter: Fighter_filter;
    Fighter_orderBy: Fighter_orderBy;
    ID: ResolverTypeWrapper<Scalars['ID']>;
    Int: ResolverTypeWrapper<Scalars['Int']>;
    NFTProject: ResolverTypeWrapper<NFTProject>;
    NFTProject_filter: NFTProject_filter;
    NFTProject_orderBy: NFTProject_orderBy;
    OrderDirection: OrderDirection;
    String: ResolverTypeWrapper<Scalars['String']>;
    SyncStatus: ResolverTypeWrapper<SyncStatus>;
    SyncStatusEnum: SyncStatusEnum;
    SyncStatus_filter: SyncStatus_filter;
    SyncStatus_orderBy: SyncStatus_orderBy;
    _Block_: ResolverTypeWrapper<_Block_>;
    _Meta_: ResolverTypeWrapper<_Meta_>;
    _SubgraphErrorPolicy_: _SubgraphErrorPolicy_;
}>;
/** Mapping between all available schema types and the resolvers parents */
export declare type ResolversParentTypes = ResolversObject<{
    Query: {};
    Subscription: {};
    BigDecimal: Scalars['BigDecimal'];
    BigInt: Scalars['BigInt'];
    Block_height: Block_height;
    Boolean: Scalars['Boolean'];
    Bytes: Scalars['Bytes'];
    Fighter: Fighter;
    Fighter_filter: Fighter_filter;
    ID: Scalars['ID'];
    Int: Scalars['Int'];
    NFTProject: NFTProject;
    NFTProject_filter: NFTProject_filter;
    String: Scalars['String'];
    SyncStatus: SyncStatus;
    SyncStatus_filter: SyncStatus_filter;
    _Block_: _Block_;
    _Meta_: _Meta_;
}>;
export declare type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
    nftproject?: Resolver<Maybe<ResolversTypes['NFTProject']>, ParentType, ContextType, RequireFields<QuerynftprojectArgs, 'id' | 'subgraphError'>>;
    nftprojects?: Resolver<Array<ResolversTypes['NFTProject']>, ParentType, ContextType, RequireFields<QuerynftprojectsArgs, 'skip' | 'first' | 'subgraphError'>>;
    fighter?: Resolver<Maybe<ResolversTypes['Fighter']>, ParentType, ContextType, RequireFields<QueryfighterArgs, 'id' | 'subgraphError'>>;
    fighters?: Resolver<Array<ResolversTypes['Fighter']>, ParentType, ContextType, RequireFields<QueryfightersArgs, 'skip' | 'first' | 'subgraphError'>>;
    syncStatus?: Resolver<Maybe<ResolversTypes['SyncStatus']>, ParentType, ContextType, RequireFields<QuerysyncStatusArgs, 'id' | 'subgraphError'>>;
    syncStatuses?: Resolver<Array<ResolversTypes['SyncStatus']>, ParentType, ContextType, RequireFields<QuerysyncStatusesArgs, 'skip' | 'first' | 'subgraphError'>>;
    _meta?: Resolver<Maybe<ResolversTypes['_Meta_']>, ParentType, ContextType, RequireFields<Query_metaArgs, never>>;
}>;
export declare type SubscriptionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
    nftproject?: SubscriptionResolver<Maybe<ResolversTypes['NFTProject']>, "nftproject", ParentType, ContextType, RequireFields<SubscriptionnftprojectArgs, 'id' | 'subgraphError'>>;
    nftprojects?: SubscriptionResolver<Array<ResolversTypes['NFTProject']>, "nftprojects", ParentType, ContextType, RequireFields<SubscriptionnftprojectsArgs, 'skip' | 'first' | 'subgraphError'>>;
    fighter?: SubscriptionResolver<Maybe<ResolversTypes['Fighter']>, "fighter", ParentType, ContextType, RequireFields<SubscriptionfighterArgs, 'id' | 'subgraphError'>>;
    fighters?: SubscriptionResolver<Array<ResolversTypes['Fighter']>, "fighters", ParentType, ContextType, RequireFields<SubscriptionfightersArgs, 'skip' | 'first' | 'subgraphError'>>;
    syncStatus?: SubscriptionResolver<Maybe<ResolversTypes['SyncStatus']>, "syncStatus", ParentType, ContextType, RequireFields<SubscriptionsyncStatusArgs, 'id' | 'subgraphError'>>;
    syncStatuses?: SubscriptionResolver<Array<ResolversTypes['SyncStatus']>, "syncStatuses", ParentType, ContextType, RequireFields<SubscriptionsyncStatusesArgs, 'skip' | 'first' | 'subgraphError'>>;
    _meta?: SubscriptionResolver<Maybe<ResolversTypes['_Meta_']>, "_meta", ParentType, ContextType, RequireFields<Subscription_metaArgs, never>>;
}>;
export interface BigDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigDecimal'], any> {
    name: 'BigDecimal';
}
export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
    name: 'BigInt';
}
export interface BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Bytes'], any> {
    name: 'Bytes';
}
export declare type FighterResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Fighter'] = ResolversParentTypes['Fighter']> = ResolversObject<{
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    contractAddress?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
    owner?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
    tokenId?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
    syncStatuses?: Resolver<Maybe<Array<ResolversTypes['SyncStatus']>>, ParentType, ContextType, RequireFields<FightersyncStatusesArgs, 'skip' | 'first'>>;
    aggression?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
    awareness?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
    determination?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
    power?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
    resilience?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
    speed?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
    aggregatePoints?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
    syncStatus?: Resolver<ResolversTypes['SyncStatus'], ParentType, ContextType>;
    syncStatusString?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export declare type NFTProjectResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['NFTProject'] = ResolversParentTypes['NFTProject']> = ResolversObject<{
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    contractAddress?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export declare type SyncStatusResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['SyncStatus'] = ResolversParentTypes['SyncStatus']> = ResolversObject<{
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    fighter?: Resolver<ResolversTypes['Fighter'], ParentType, ContextType>;
    timestamp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
    status?: Resolver<ResolversTypes['SyncStatusEnum'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export declare type _Block_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Block_'] = ResolversParentTypes['_Block_']> = ResolversObject<{
    hash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
    number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export declare type _Meta_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Meta_'] = ResolversParentTypes['_Meta_']> = ResolversObject<{
    block?: Resolver<ResolversTypes['_Block_'], ParentType, ContextType>;
    deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;
export declare type Resolvers<ContextType = MeshContext> = ResolversObject<{
    Query?: QueryResolvers<ContextType>;
    Subscription?: SubscriptionResolvers<ContextType>;
    BigDecimal?: GraphQLScalarType;
    BigInt?: GraphQLScalarType;
    Bytes?: GraphQLScalarType;
    Fighter?: FighterResolvers<ContextType>;
    NFTProject?: NFTProjectResolvers<ContextType>;
    SyncStatus?: SyncStatusResolvers<ContextType>;
    _Block_?: _Block_Resolvers<ContextType>;
    _Meta_?: _Meta_Resolvers<ContextType>;
}>;
import { MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';
import { InContextSdkMethod } from '@graphql-mesh/types';
export declare type QueryOwnershipSdk = {
    nftproject: InContextSdkMethod<Query['nftproject'], QuerynftprojectArgs, MeshContext>;
    nftprojects: InContextSdkMethod<Query['nftprojects'], QuerynftprojectsArgs, MeshContext>;
    fighter: InContextSdkMethod<Query['fighter'], QueryfighterArgs, MeshContext>;
    fighters: InContextSdkMethod<Query['fighters'], QueryfightersArgs, MeshContext>;
    syncStatus: InContextSdkMethod<Query['syncStatus'], QuerysyncStatusArgs, MeshContext>;
    syncStatuses: InContextSdkMethod<Query['syncStatuses'], QuerysyncStatusesArgs, MeshContext>;
    _meta: InContextSdkMethod<Query['_meta'], Query_metaArgs, MeshContext>;
};
export declare type MutationOwnershipSdk = {};
export declare type SubscriptionOwnershipSdk = {
    nftproject: InContextSdkMethod<Subscription['nftproject'], SubscriptionnftprojectArgs, MeshContext>;
    nftprojects: InContextSdkMethod<Subscription['nftprojects'], SubscriptionnftprojectsArgs, MeshContext>;
    fighter: InContextSdkMethod<Subscription['fighter'], SubscriptionfighterArgs, MeshContext>;
    fighters: InContextSdkMethod<Subscription['fighters'], SubscriptionfightersArgs, MeshContext>;
    syncStatus: InContextSdkMethod<Subscription['syncStatus'], SubscriptionsyncStatusArgs, MeshContext>;
    syncStatuses: InContextSdkMethod<Subscription['syncStatuses'], SubscriptionsyncStatusesArgs, MeshContext>;
    _meta: InContextSdkMethod<Subscription['_meta'], Subscription_metaArgs, MeshContext>;
};
export declare type QuerySavestateSdk = {
    fighter: InContextSdkMethod<Query['fighter'], QueryfighterArgs, MeshContext>;
    fighters: InContextSdkMethod<Query['fighters'], QueryfightersArgs, MeshContext>;
    syncStatus: InContextSdkMethod<Query['syncStatus'], QuerysyncStatusArgs, MeshContext>;
    syncStatuses: InContextSdkMethod<Query['syncStatuses'], QuerysyncStatusesArgs, MeshContext>;
    _meta: InContextSdkMethod<Query['_meta'], Query_metaArgs, MeshContext>;
};
export declare type MutationSavestateSdk = {};
export declare type SubscriptionSavestateSdk = {
    fighter: InContextSdkMethod<Subscription['fighter'], SubscriptionfighterArgs, MeshContext>;
    fighters: InContextSdkMethod<Subscription['fighters'], SubscriptionfightersArgs, MeshContext>;
    syncStatus: InContextSdkMethod<Subscription['syncStatus'], SubscriptionsyncStatusArgs, MeshContext>;
    syncStatuses: InContextSdkMethod<Subscription['syncStatuses'], SubscriptionsyncStatusesArgs, MeshContext>;
    _meta: InContextSdkMethod<Subscription['_meta'], Subscription_metaArgs, MeshContext>;
};
export declare type OwnershipContext = {
    ["ownership"]: {
        Query: QueryOwnershipSdk;
        Mutation: MutationOwnershipSdk;
        Subscription: SubscriptionOwnershipSdk;
    };
};
export declare type SavestateContext = {
    ["savestate"]: {
        Query: QuerySavestateSdk;
        Mutation: MutationSavestateSdk;
        Subscription: SubscriptionSavestateSdk;
    };
};
export declare type MeshContext = OwnershipContext & SavestateContext & BaseMeshContext;
import { GetMeshOptions } from '@graphql-mesh/runtime';
import { YamlConfig } from '@graphql-mesh/types';
export declare const rawConfig: YamlConfig.Config;
export declare function getMeshOptions(): GetMeshOptions;
export declare const documentsInSDL: string[];
export declare function getBuiltMesh(): Promise<MeshInstance>;
export declare function getMeshSDK<TGlobalContext = any, TGlobalRoot = any, TOperationContext = any, TOperationRoot = any>(sdkOptions?: SdkOptions<TGlobalContext, TGlobalRoot>): Promise<{
    getFighter(variables?: Exact<{
        id?: string;
    }>, context?: TOperationContext, root?: TOperationRoot): Promise<getFighterQuery>;
    getFightersForAddress(variables?: Exact<{
        address?: any;
    }>, context?: TOperationContext, root?: TOperationRoot): Promise<getFightersForAddressQuery>;
}>;
export declare type getFighterQueryVariables = Exact<{
    id?: Scalars['ID'];
}>;
export declare type getFighterQuery = {
    fighter?: Maybe<(Pick<Fighter, 'id' | 'owner' | 'contractAddress' | 'tokenId' | 'aggregatePoints' | 'aggression' | 'awareness' | 'determination' | 'resilience' | 'power' | 'speed'> & {
        syncStatus: Pick<SyncStatus, 'status' | 'timestamp'>;
    })>;
};
export declare type getFightersForAddressQueryVariables = Exact<{
    address?: Scalars['Bytes'];
}>;
export declare type getFightersForAddressQuery = {
    fighters: Array<(Pick<Fighter, 'id' | 'owner' | 'contractAddress' | 'tokenId' | 'aggregatePoints' | 'aggression' | 'awareness' | 'determination' | 'resilience' | 'power' | 'speed'> & {
        syncStatus: Pick<SyncStatus, 'status' | 'timestamp'>;
    })>;
};
export declare const getFighterDocument: DocumentNode;
export declare const getFightersForAddressDocument: DocumentNode;
export interface SdkOptions<TGlobalContext = any, TGlobalRoot = any> {
    globalContext?: TGlobalContext;
    globalRoot?: TGlobalRoot;
    jitOptions?: Partial<CompilerOptions>;
}
export declare function getSdk<TGlobalContext = any, TGlobalRoot = any, TOperationContext = any, TOperationRoot = any>(schema: GraphQLSchema, { globalContext, globalRoot, jitOptions }?: SdkOptions<TGlobalContext, TGlobalRoot>): {
    getFighter(variables?: getFighterQueryVariables, context?: TOperationContext, root?: TOperationRoot): Promise<getFighterQuery>;
    getFightersForAddress(variables?: getFightersForAddressQueryVariables, context?: TOperationContext, root?: TOperationRoot): Promise<getFightersForAddressQuery>;
};
export declare type Sdk = ReturnType<typeof getSdk>;
