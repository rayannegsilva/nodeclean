import { MissingParamError } from '@/presentation/erros'
import { LoginController } from './login'
import { badRequest } from '@/presentation/helpers/http-helper'

describe('Login Controller', () => {
  it('should returns 400 if no email is provided', async () => {
    const sut = new LoginController()
    const httpRequest = {
      body: {
        // email: 'valid_email@mail.com',
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  it('should returns 400 if no email is provided', async () => {
    const sut = new LoginController()
    const httpRequest = {
      body: {
        email: 'valid_email@mail.com'
        // password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })
})
