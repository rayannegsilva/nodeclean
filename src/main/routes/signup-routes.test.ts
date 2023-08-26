import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'

describe('SignUp Routes', () => {
  const MONGO_URL = process.env.MONGO_URL ?? 'any_url'

  beforeAll(async () => {
    await MongoHelper.connect(MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  it('should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Rayanne',
        email: 'rgilodasilva@gmail.com',
        password: '123456',
        passwordConfirmation: '123456'
      })
      .expect(200)
  })
})
