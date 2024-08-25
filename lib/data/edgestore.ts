import { initEdgeStore } from '@edgestore/server'
import { initEdgeStoreClient } from '@edgestore/server/core'
import { createEdgeStoreNextHandler } from '@edgestore/server/adapters/next/app'

const es = initEdgeStore.create()

const edgeStoreRouter = es.router({
  publicFiles: es.fileBucket(),
})

export const handler = createEdgeStoreNextHandler({
  router: edgeStoreRouter,
})

export const backendClient = initEdgeStoreClient({
  router: edgeStoreRouter,
})

export type EdgeStoreRouter = typeof edgeStoreRouter
