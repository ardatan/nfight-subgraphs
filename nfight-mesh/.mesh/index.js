"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSdk = exports.getFightersForAddressDocument = exports.getFighterDocument = exports.getMeshSDK = exports.getBuiltMesh = exports.documentsInSDL = exports.getMeshOptions = exports.rawConfig = void 0;
const tslib_1 = require("tslib");
const graphql_jit_1 = require("graphql-jit");
const utils_1 = require("@graphql-tools/utils");
const graphql_1 = require("graphql");
const runtime_1 = require("@graphql-mesh/runtime");
const store_1 = require("@graphql-mesh/store");
const path_1 = require("path");
const cache_inmemory_lru_1 = (0, tslib_1.__importDefault)(require("@graphql-mesh/cache-inmemory-lru"));
const graphql_2 = (0, tslib_1.__importDefault)(require("@graphql-mesh/graphql"));
const merger_stitching_1 = (0, tslib_1.__importDefault)(require("@graphql-mesh/merger-stitching"));
const transform_type_merging_1 = (0, tslib_1.__importDefault)(require("@graphql-mesh/transform-type-merging"));
const schema_graphql_cjs_1 = (0, tslib_1.__importDefault)(require("./sources/ownership/schema.graphql.cjs"));
const schema_graphql_cjs_2 = (0, tslib_1.__importDefault)(require("./sources/savestate/schema.graphql.cjs"));
const importedModules = {
    // @ts-ignore
    ["@graphql-mesh/cache-inmemory-lru"]: cache_inmemory_lru_1.default,
    // @ts-ignore
    ["@graphql-mesh/graphql"]: graphql_2.default,
    // @ts-ignore
    ["@graphql-mesh/merger-stitching"]: merger_stitching_1.default,
    // @ts-ignore
    ["@graphql-mesh/transform-type-merging"]: transform_type_merging_1.default,
    // @ts-ignore
    [".mesh/sources/ownership/schema.graphql.cjs"]: schema_graphql_cjs_1.default,
    // @ts-ignore
    [".mesh/sources/savestate/schema.graphql.cjs"]: schema_graphql_cjs_2.default
};
const baseDir = (0, path_1.join)(__dirname, '..');
const importFn = (moduleId) => {
    const relativeModuleId = ((0, path_1.isAbsolute)(moduleId) ? (0, path_1.relative)(baseDir, moduleId) : moduleId).split('\\').join('/');
    if (!(relativeModuleId in importedModules)) {
        throw new Error(`Cannot find module '${relativeModuleId}'.`);
    }
    return Promise.resolve(importedModules[relativeModuleId]);
};
const rootStore = new store_1.MeshStore('.mesh', new store_1.FsStoreStorageAdapter({
    cwd: baseDir,
    importFn,
}), {
    readonly: true,
    validate: false
});
const cache_inmemory_lru_2 = (0, tslib_1.__importDefault)(require("@graphql-mesh/cache-inmemory-lru"));
const utils_2 = require("@graphql-mesh/utils");
const utils_3 = require("@graphql-mesh/utils");
const graphql_3 = (0, tslib_1.__importDefault)(require("@graphql-mesh/graphql"));
const merger_stitching_2 = (0, tslib_1.__importDefault)(require("@graphql-mesh/merger-stitching"));
const transform_type_merging_2 = (0, tslib_1.__importDefault)(require("@graphql-mesh/transform-type-merging"));
const utils_4 = require("@graphql-mesh/utils");
const additionalResolvers$0 = (0, tslib_1.__importStar)(require("../resolvers/syncStatus.js"));
exports.rawConfig = { "sources": [{ "name": "ownership", "handler": { "graphql": { "endpoint": "https://api.thegraph.com/subgraphs/name/sbauch/nfight-ownership" }, "batch": true }, "transforms": [{ "typeMerging": { "queryFields": [{ "queryFieldName": "fighters", "keyField": "id", "keyArg": "where.id_in" }, { "queryFieldName": "syncStatuses", "keyField": "id", "keyArg": "where.id_in" }] } }] }, { "name": "savestate", "handler": { "graphql": { "endpoint": "https://api.thegraph.com/subgraphs/name/sbauch/nfight-gamedata" }, "batch": false }, "transforms": [{ "typeMerging": { "queryFields": [{ "queryFieldName": "fighter", "keyField": "id", "keyArg": "id" }, { "queryFieldName": "syncStatus", "keyField": "id", "keyArg": "id" }] } }] }], "additionalTypeDefs": "extend type Fighter {\n  syncStatus: SyncStatus!\n  syncStatusString: String!\n}\n", "additionalResolvers": ["./resolvers/syncStatus.js"], "documents": ["./operations/**/*.graphql"], "serve": { "browser": true, "playground": true } };
async function getMeshOptions() {
    const cache = new cache_inmemory_lru_2.default({
        ...(exports.rawConfig.cache || {}),
        store: rootStore.child('cache'),
    });
    const pubsub = new utils_2.PubSub();
    const sourcesStore = rootStore.child('sources');
    const logger = new utils_3.DefaultLogger('🕸️');
    const sources = [];
    const transforms = [];
    const ownershipTransforms = [];
    const savestateTransforms = [];
    const ownershipHandler = new graphql_3.default({
        name: exports.rawConfig.sources[0].name,
        config: exports.rawConfig.sources[0].handler["graphql"],
        baseDir,
        cache,
        pubsub,
        store: sourcesStore.child(exports.rawConfig.sources[0].name),
        logger: logger.child(exports.rawConfig.sources[0].name),
        importFn
    });
    const savestateHandler = new graphql_3.default({
        name: exports.rawConfig.sources[1].name,
        config: exports.rawConfig.sources[1].handler["graphql"],
        baseDir,
        cache,
        pubsub,
        store: sourcesStore.child(exports.rawConfig.sources[1].name),
        logger: logger.child(exports.rawConfig.sources[1].name),
        importFn
    });
    const additionalTypeDefs = [(0, graphql_1.parse)(/* GraphQL */ `extend type Fighter {
  syncStatus: SyncStatus!
  syncStatusString: String!
}`),];
    const merger = new merger_stitching_2.default({
        cache,
        pubsub,
        logger: logger.child('StitchingMerger'),
        store: rootStore.child('stitchingMerger')
    });
    ownershipTransforms.push(new transform_type_merging_2.default({
        apiName: exports.rawConfig.sources[0].name,
        config: exports.rawConfig.sources[0].transforms[0]["typeMerging"],
        baseDir,
        cache,
        pubsub,
        importFn
    }));
    savestateTransforms.push(new transform_type_merging_2.default({
        apiName: exports.rawConfig.sources[1].name,
        config: exports.rawConfig.sources[1].transforms[0]["typeMerging"],
        baseDir,
        cache,
        pubsub,
        importFn
    }));
    sources.push({
        name: 'ownership',
        handler: ownershipHandler,
        transforms: ownershipTransforms
    });
    sources.push({
        name: 'savestate',
        handler: savestateHandler,
        transforms: savestateTransforms
    });
    const additionalResolversRawConfig = [];
    additionalResolversRawConfig.push(additionalResolvers$0.resolvers || additionalResolvers$0.default || additionalResolvers$0);
    const additionalResolvers = await (0, utils_4.resolveAdditionalResolvers)(baseDir, additionalResolversRawConfig, importFn, pubsub);
    const liveQueryInvalidations = exports.rawConfig.liveQueryInvalidations;
    return {
        sources,
        transforms,
        additionalTypeDefs,
        additionalResolvers,
        cache,
        pubsub,
        merger,
        logger,
        liveQueryInvalidations,
    };
}
exports.getMeshOptions = getMeshOptions;
exports.documentsInSDL = [/* GraphQL */ `query getFighter($id: ID! = "0xb3ea7cbb180d834c279b06873b6a971cce7014681") {
  fighter(id: $id) {
    id
    owner
    contractAddress
    tokenId
    aggregatePoints
    aggression
    awareness
    determination
    resilience
    power
    speed
    syncStatus {
      status
      timestamp
    }
  }
}`, /* GraphQL */ `query getFightersForAddress($address: Bytes! = "0xc102f76973f4890cab1b5d1ed26f3623381983af") {
  fighters(where: {owner: $address}) {
    id
    owner
    contractAddress
    tokenId
    aggregatePoints
    aggression
    awareness
    determination
    resilience
    power
    speed
    syncStatus {
      status
      timestamp
    }
  }
}`];
async function getBuiltMesh() {
    const meshConfig = await getMeshOptions();
    return (0, runtime_1.getMesh)(meshConfig);
}
exports.getBuiltMesh = getBuiltMesh;
async function getMeshSDK(sdkOptions) {
    const { schema } = await getBuiltMesh();
    return getSdk(schema, {
        jitOptions: {
            disableLeafSerialization: true,
            disablingCapturingStackErrors: true
        },
        ...sdkOptions,
    });
}
exports.getMeshSDK = getMeshSDK;
exports.getFighterDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "getFighter" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } }, "defaultValue": { "kind": "StringValue", "value": "0xb3ea7cbb180d834c279b06873b6a971cce7014681", "block": false } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "fighter" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "owner" } }, { "kind": "Field", "name": { "kind": "Name", "value": "contractAddress" } }, { "kind": "Field", "name": { "kind": "Name", "value": "tokenId" } }, { "kind": "Field", "name": { "kind": "Name", "value": "aggregatePoints" } }, { "kind": "Field", "name": { "kind": "Name", "value": "aggression" } }, { "kind": "Field", "name": { "kind": "Name", "value": "awareness" } }, { "kind": "Field", "name": { "kind": "Name", "value": "determination" } }, { "kind": "Field", "name": { "kind": "Name", "value": "resilience" } }, { "kind": "Field", "name": { "kind": "Name", "value": "power" } }, { "kind": "Field", "name": { "kind": "Name", "value": "speed" } }, { "kind": "Field", "name": { "kind": "Name", "value": "syncStatus" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "status" } }, { "kind": "Field", "name": { "kind": "Name", "value": "timestamp" } }] } }] } }] } }] };
exports.getFightersForAddressDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "getFightersForAddress" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "address" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Bytes" } } }, "defaultValue": { "kind": "StringValue", "value": "0xc102f76973f4890cab1b5d1ed26f3623381983af", "block": false } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "fighters" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "where" }, "value": { "kind": "ObjectValue", "fields": [{ "kind": "ObjectField", "name": { "kind": "Name", "value": "owner" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "address" } } }] } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "owner" } }, { "kind": "Field", "name": { "kind": "Name", "value": "contractAddress" } }, { "kind": "Field", "name": { "kind": "Name", "value": "tokenId" } }, { "kind": "Field", "name": { "kind": "Name", "value": "aggregatePoints" } }, { "kind": "Field", "name": { "kind": "Name", "value": "aggression" } }, { "kind": "Field", "name": { "kind": "Name", "value": "awareness" } }, { "kind": "Field", "name": { "kind": "Name", "value": "determination" } }, { "kind": "Field", "name": { "kind": "Name", "value": "resilience" } }, { "kind": "Field", "name": { "kind": "Name", "value": "power" } }, { "kind": "Field", "name": { "kind": "Name", "value": "speed" } }, { "kind": "Field", "name": { "kind": "Name", "value": "syncStatus" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "status" } }, { "kind": "Field", "name": { "kind": "Name", "value": "timestamp" } }] } }] } }] } }] };
function handleExecutionResult(result, operationName) {
    if (result.errors) {
        const originalErrors = result.errors.map(error => error.originalError || error);
        throw new utils_1.AggregateError(originalErrors, `Failed to execute ${operationName}: \n\t${originalErrors.join('\n\t')}`);
    }
    return result.data;
}
function getSdk(schema, { globalContext, globalRoot, jitOptions = {} } = {}) {
    const getFighterCompiled = (0, graphql_jit_1.compileQuery)(schema, exports.getFighterDocument, 'getFighter', jitOptions);
    if (!((0, graphql_jit_1.isCompiledQuery)(getFighterCompiled))) {
        const originalErrors = getFighterCompiled?.errors?.map(error => error.originalError || error) || [];
        throw new utils_1.AggregateError(originalErrors, `Failed to compile getFighter: \n\t${originalErrors.join('\n\t')}`);
    }
    const getFightersForAddressCompiled = (0, graphql_jit_1.compileQuery)(schema, exports.getFightersForAddressDocument, 'getFightersForAddress', jitOptions);
    if (!((0, graphql_jit_1.isCompiledQuery)(getFightersForAddressCompiled))) {
        const originalErrors = getFightersForAddressCompiled?.errors?.map(error => error.originalError || error) || [];
        throw new utils_1.AggregateError(originalErrors, `Failed to compile getFightersForAddress: \n\t${originalErrors.join('\n\t')}`);
    }
    return {
        async getFighter(variables, context, root) {
            const result = await getFighterCompiled.query({
                ...globalRoot,
                ...root
            }, {
                ...globalContext,
                ...context
            }, variables);
            return handleExecutionResult(result, 'getFighter');
        },
        async getFightersForAddress(variables, context, root) {
            const result = await getFightersForAddressCompiled.query({
                ...globalRoot,
                ...root
            }, {
                ...globalContext,
                ...context
            }, variables);
            return handleExecutionResult(result, 'getFightersForAddress');
        }
    };
}
exports.getSdk = getSdk;
