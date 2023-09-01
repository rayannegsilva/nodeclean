import { badRequest } from '../../../presentation/helpers/http-helper'
import { HttpRequest, HttpResponse, Controller } from '../../protocols'
import { MissingParamError } from '@/presentation/erros'

export class LoginController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    return await new Promise(resolve => resolve(badRequest(new MissingParamError('email'))))
  }
}
