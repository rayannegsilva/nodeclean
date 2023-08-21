import { MongoClient } from 'mongodb'

export const MongoHelper = {
  client: undefined as unknown as MongoClient | undefined,
  uri: undefined as unknown as string | undefined,

  async connect (uri: string): Promise<void> {
    MongoHelper.client = await MongoClient.connect(uri)
    MongoHelper.uri = uri
  },

  async disconnect () {
    await MongoHelper.client?.close()
    MongoHelper.client = undefined
  }
}
