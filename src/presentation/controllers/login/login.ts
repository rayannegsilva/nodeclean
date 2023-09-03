import { badRequest, serverError } from '../../../presentation/helpers/http-helper'
import { HttpRequest, HttpResponse, Controller } from '../../protocols'
import { InvalidParamError, MissingParamError } from '../../../presentation/erros'
import { EmailValidator } from '../signUp/signup-protocols'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body

      if (!email) {
        return await new Promise(resolve => resolve(badRequest(new MissingParamError('email'))))
      }

      if (!password) {
        return await new Promise(resolve => resolve(badRequest(new MissingParamError('password'))))
      }

      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      return httpRequest.body
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
