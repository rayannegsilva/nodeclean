import { MongoHelper as sut } from './mongo-helper'

describe('Mongo helper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL as string)
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  it('Should reconnect if MongoDb is down', async () => {
    let accountCollection = await sut.getCollection('accounts')

    expect(accountCollection).toBeTruthy()
    await sut.disconnect()

    accountCollection = await sut.getCollection('accounts')
    expect(accountCollection).toBeTruthy()
  })
})
