import { MongoHelper } from '../infra/db/mongodb/helpers/mongo-helper'
import env from './config/env'

console.log(env.MONGO_URL)

MongoHelper.connect(env.MONGO_URL)
  .then(async () => {
    console.log(env.MONGO_URL)
    const app = (await (import('./config/app'))).default
    app.listen(env.port, () => {
      console.log(`Server Running at http://localhost:${env.port}`)
    })
  })
  .catch(console.error)
