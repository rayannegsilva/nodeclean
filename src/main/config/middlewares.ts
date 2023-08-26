import { type Application } from 'express'
import { bodyParser, contentType, cors } from '../middlewares'

export default (app: Application): void => {
  app.use(bodyParser)
  app.use(cors)
  app.use(contentType)
}
