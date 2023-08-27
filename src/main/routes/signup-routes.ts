import { Router } from 'express'
import { adaptRoute } from '../adapter/signup-routes-adapter'
import { makeSignUpController } from '../factories/signup'

const signUpRoute = (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
}

export default signUpRoute
