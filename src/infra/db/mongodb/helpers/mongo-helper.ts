import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: undefined as unknown as MongoClient,
  uri: undefined as unknown as string,

  connect: async (uri: string): Promise<void> => {
    MongoHelper.client = await MongoClient.connect(uri)
    MongoHelper.uri = uri
  },

  async disconnect () {
    await MongoHelper.client?.close()
    // MongoHelper.client = undefined
  },

  getCollection (name: string): Collection {
    return MongoHelper.client?.db().collection(name)
  },
  // getCollection: async <CollectionType extends Document>(name: string): Promise<Collection<CollectionType>> => {
  //   if (!MongoHelper.client) MongoHelper.client = await MongoClient.connect(MongoHelper.uri as string)
  //   return MongoHelper.client?.db().collection(name)
  // }

  map (collection: any): any {
    if (collection?._id) {
      const { _id, ...accountWithoutId } = collection
      collection = Object.assign({}, accountWithoutId, { id: _id })
    }

    return collection
  }
}
