import { InvalidParamError } from '../erros/invalid-param-error'
import { MissingParamError } from '../erros/missing-param-error'
import { ServerError } from '../erros/server-error'
import { Controller } from '../protocols/controller'
import { EmailValidator } from '../protocols/email-validator'
import { HttpResponse, HttpRequest } from '../protocols/http'
import { badRequest } from '@/presentation/helpers/http-helper'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const isValid = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      return {
        statusCode: 200,
        body: { message: 'Success' }
      }
    } catch {
      return {
        statusCode: 500,
        body: new ServerError()
      }
    }
  }
}
