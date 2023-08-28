import { Collection, MongoClient } from 'mongodb'

export const MongoHelper = {
  client: undefined as unknown as MongoClient | undefined,
  uri: undefined as unknown as string | undefined,

  connect: async (uri: string): Promise<void> => {
    MongoHelper.client = await MongoClient.connect(uri)
    MongoHelper.uri = uri
  },

  async disconnect (): Promise<void> {
    await MongoHelper.client?.close()
    MongoHelper.client = undefined
  },

  async getCollection (name: string): Promise<Collection> {
    if (!MongoHelper.client) MongoHelper.client = await MongoClient.connect(MongoHelper.uri as string)
    return MongoHelper.client.db().collection(name)
  },

  map (collection: any): any {
    if (collection?._id) {
      const { _id, ...accountWithoutId } = collection
      collection = Object.assign({}, accountWithoutId, { id: _id })
    }

    return collection
  }
}
