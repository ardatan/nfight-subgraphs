import { compileQuery, isCompiledQuery } from 'graphql-jit';
import { AggregateError } from '@graphql-tools/utils';
import { parse } from 'graphql';
import { getMesh } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { join, relative, isAbsolute, dirname } from 'path';
import { fileURLToPath } from 'url';
import ExternalModule_0 from '@graphql-mesh/cache-inmemory-lru';
import ExternalModule_1 from '@graphql-mesh/graphql';
import ExternalModule_2 from '@graphql-mesh/merger-stitching';
import ExternalModule_3 from '@graphql-mesh/transform-type-merging';
import ExternalModule_4 from './sources/ownership/schema.graphql.cjs';
import ExternalModule_5 from './sources/savestate/schema.graphql.cjs';
const importedModules = {
    // @ts-ignore
    ["@graphql-mesh/cache-inmemory-lru"]: ExternalModule_0,
    // @ts-ignore
    ["@graphql-mesh/graphql"]: ExternalModule_1,
    // @ts-ignore
    ["@graphql-mesh/merger-stitching"]: ExternalModule_2,
    // @ts-ignore
    ["@graphql-mesh/transform-type-merging"]: ExternalModule_3,
    // @ts-ignore
    [".mesh/sources/ownership/schema.graphql.cjs"]: ExternalModule_4,
    // @ts-ignore
    [".mesh/sources/savestate/schema.graphql.cjs"]: ExternalModule_5
};
const baseDir = join(dirname(fileURLToPath(import.meta.url)), '..');
const importFn = (moduleId) => {
    const relativeModuleId = (isAbsolute(moduleId) ? relative(baseDir, moduleId) : moduleId).split('\\').join('/');
    if (!(relativeModuleId in importedModules)) {
        throw new Error(`Cannot find module '${relativeModuleId}'.`);
    }
    return Promise.resolve(importedModules[relativeModuleId]);
};
const rootStore = new MeshStore('.mesh', new FsStoreStorageAdapter({
    cwd: baseDir,
    importFn,
}), {
    readonly: true,
    validate: false
});
import MeshCache from '@graphql-mesh/cache-inmemory-lru';
import { PubSub } from '@graphql-mesh/utils';
import { DefaultLogger } from '@graphql-mesh/utils';
import GraphqlHandler from '@graphql-mesh/graphql';
import StitchingMerger from '@graphql-mesh/merger-stitching';
import TypeMergingTransform from '@graphql-mesh/transform-type-merging';
import { resolveAdditionalResolvers } from '@graphql-mesh/utils';
import * as additionalResolvers$0 from '../resolvers/syncStatus.js';
export const rawConfig = { "sources": [{ "name": "ownership", "handler": { "graphql": { "endpoint": "https://api.thegraph.com/subgraphs/name/sbauch/nfight-ownership" }, "batch": true }, "transforms": [{ "typeMerging": { "queryFields": [{ "queryFieldName": "fighters", "keyField": "id", "keyArg": "where.id_in" }, { "queryFieldName": "syncStatuses", "keyField": "id", "keyArg": "where.id_in" }] } }] }, { "name": "savestate", "handler": { "graphql": { "endpoint": "https://api.thegraph.com/subgraphs/name/sbauch/nfight-gamedata" }, "batch": false }, "transforms": [{ "typeMerging": { "queryFields": [{ "queryFieldName": "fighter", "keyField": "id", "keyArg": "id" }, { "queryFieldName": "syncStatus", "keyField": "id", "keyArg": "id" }] } }] }], "additionalTypeDefs": "extend type Fighter {\n  syncStatus: SyncStatus!\n  syncStatusString: String!\n}\n", "additionalResolvers": ["./resolvers/syncStatus.js"], "documents": ["./operations/**/*.graphql"], "serve": { "browser": true, "playground": true } };
export async function getMeshOptions() {
    const cache = new MeshCache({
        ...(rawConfig.cache || {}),
        store: rootStore.child('cache'),
    });
    const pubsub = new PubSub();
    const sourcesStore = rootStore.child('sources');
    const logger = new DefaultLogger('🕸️');
    const sources = [];
    const transforms = [];
    const ownershipTransforms = [];
    const savestateTransforms = [];
    const ownershipHandler = new GraphqlHandler({
        name: rawConfig.sources[0].name,
        config: rawConfig.sources[0].handler["graphql"],
        baseDir,
        cache,
        pubsub,
        store: sourcesStore.child(rawConfig.sources[0].name),
        logger: logger.child(rawConfig.sources[0].name),
        importFn
    });
    const savestateHandler = new GraphqlHandler({
        name: rawConfig.sources[1].name,
        config: rawConfig.sources[1].handler["graphql"],
        baseDir,
        cache,
        pubsub,
        store: sourcesStore.child(rawConfig.sources[1].name),
        logger: logger.child(rawConfig.sources[1].name),
        importFn
    });
    const additionalTypeDefs = [parse(/* GraphQL */ `extend type Fighter {
  syncStatus: SyncStatus!
  syncStatusString: String!
}`),];
    const merger = new StitchingMerger({
        cache,
        pubsub,
        logger: logger.child('StitchingMerger'),
        store: rootStore.child('stitchingMerger')
    });
    ownershipTransforms.push(new TypeMergingTransform({
        apiName: rawConfig.sources[0].name,
        config: rawConfig.sources[0].transforms[0]["typeMerging"],
        baseDir,
        cache,
        pubsub,
        importFn
    }));
    savestateTransforms.push(new TypeMergingTransform({
        apiName: rawConfig.sources[1].name,
        config: rawConfig.sources[1].transforms[0]["typeMerging"],
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
    const additionalResolvers = await resolveAdditionalResolvers(baseDir, additionalResolversRawConfig, importFn, pubsub);
    const liveQueryInvalidations = rawConfig.liveQueryInvalidations;
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
export const documentsInSDL = /*#__PURE__*/ [/* GraphQL */ `query getFighter($id: ID! = "0xb3ea7cbb180d834c279b06873b6a971cce7014681") {
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
export async function getBuiltMesh() {
    const meshConfig = await getMeshOptions();
    return getMesh(meshConfig);
}
export async function getMeshSDK(sdkOptions) {
    const { schema } = await getBuiltMesh();
    return getSdk(schema, {
        jitOptions: {
            disableLeafSerialization: true,
            disablingCapturingStackErrors: true
        },
        ...sdkOptions,
    });
}
export const getFighterDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "getFighter" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } }, "defaultValue": { "kind": "StringValue", "value": "0xb3ea7cbb180d834c279b06873b6a971cce7014681", "block": false } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "fighter" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "owner" } }, { "kind": "Field", "name": { "kind": "Name", "value": "contractAddress" } }, { "kind": "Field", "name": { "kind": "Name", "value": "tokenId" } }, { "kind": "Field", "name": { "kind": "Name", "value": "aggregatePoints" } }, { "kind": "Field", "name": { "kind": "Name", "value": "aggression" } }, { "kind": "Field", "name": { "kind": "Name", "value": "awareness" } }, { "kind": "Field", "name": { "kind": "Name", "value": "determination" } }, { "kind": "Field", "name": { "kind": "Name", "value": "resilience" } }, { "kind": "Field", "name": { "kind": "Name", "value": "power" } }, { "kind": "Field", "name": { "kind": "Name", "value": "speed" } }, { "kind": "Field", "name": { "kind": "Name", "value": "syncStatus" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "status" } }, { "kind": "Field", "name": { "kind": "Name", "value": "timestamp" } }] } }] } }] } }] };
export const getFightersForAddressDocument = { "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "getFightersForAddress" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "address" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Bytes" } } }, "defaultValue": { "kind": "StringValue", "value": "0xc102f76973f4890cab1b5d1ed26f3623381983af", "block": false } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "fighters" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "where" }, "value": { "kind": "ObjectValue", "fields": [{ "kind": "ObjectField", "name": { "kind": "Name", "value": "owner" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "address" } } }] } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "owner" } }, { "kind": "Field", "name": { "kind": "Name", "value": "contractAddress" } }, { "kind": "Field", "name": { "kind": "Name", "value": "tokenId" } }, { "kind": "Field", "name": { "kind": "Name", "value": "aggregatePoints" } }, { "kind": "Field", "name": { "kind": "Name", "value": "aggression" } }, { "kind": "Field", "name": { "kind": "Name", "value": "awareness" } }, { "kind": "Field", "name": { "kind": "Name", "value": "determination" } }, { "kind": "Field", "name": { "kind": "Name", "value": "resilience" } }, { "kind": "Field", "name": { "kind": "Name", "value": "power" } }, { "kind": "Field", "name": { "kind": "Name", "value": "speed" } }, { "kind": "Field", "name": { "kind": "Name", "value": "syncStatus" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "status" } }, { "kind": "Field", "name": { "kind": "Name", "value": "timestamp" } }] } }] } }] } }] };
function handleExecutionResult(result, operationName) {
    if (result.errors) {
        const originalErrors = result.errors.map(error => error.originalError || error);
        throw new AggregateError(originalErrors, `Failed to execute ${operationName}: \n\t${originalErrors.join('\n\t')}`);
    }
    return result.data;
}
export function getSdk(schema, { globalContext, globalRoot, jitOptions = {} } = {}) {
    const getFighterCompiled = compileQuery(schema, getFighterDocument, 'getFighter', jitOptions);
    if (!(isCompiledQuery(getFighterCompiled))) {
        const originalErrors = getFighterCompiled?.errors?.map(error => error.originalError || error) || [];
        throw new AggregateError(originalErrors, `Failed to compile getFighter: \n\t${originalErrors.join('\n\t')}`);
    }
    const getFightersForAddressCompiled = compileQuery(schema, getFightersForAddressDocument, 'getFightersForAddress', jitOptions);
    if (!(isCompiledQuery(getFightersForAddressCompiled))) {
        const originalErrors = getFightersForAddressCompiled?.errors?.map(error => error.originalError || error) || [];
        throw new AggregateError(originalErrors, `Failed to compile getFightersForAddress: \n\t${originalErrors.join('\n\t')}`);
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
