import { Router } from 'express'

const signUpRoute = (router: Router): void => {
  router.post('/signup', (req, res) => {
    res.json({ ok: 'ok' })
  })
}

export default signUpRoute
