import { badRequest, serverError } from '../../../presentation/helpers/http-helper'
import { HttpRequest, HttpResponse, Controller } from '../../protocols'
import { InvalidParamError, MissingParamError } from '../../../presentation/erros'
import { EmailValidator } from '../signUp/signup-protocols'
import { Authentication } from '../../../domain/usecases/authentication'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly authentication: Authentication

  constructor (emailValidator: EmailValidator, authentication: Authentication) {
    this.emailValidator = emailValidator
    this.authentication = authentication
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['email', 'password']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const { email, password } = httpRequest.body

      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      await this.authentication.auth(email, password)

      return httpRequest.body
    } catch (error) {
      return serverError(error as Error)
    }
  }
}
