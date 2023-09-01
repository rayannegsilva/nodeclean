import { badRequest } from '../../../presentation/helpers/http-helper'
import { HttpRequest, HttpResponse, Controller } from '../../protocols'
import { MissingParamError } from '@/presentation/erros'

export class LoginController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.email) {
      return await new Promise(resolve => resolve(badRequest(new MissingParamError('email'))))
    }

    if (!httpRequest.body.password) {
      return await new Promise(resolve => resolve(badRequest(new MissingParamError('password'))))
    }

    return httpRequest.body
  }
}
