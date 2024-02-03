import type { Request, Response } from "express"
import { describe, it } from "mocha"
import { expect } from "chai"
import sinon from "sinon"
import userODM from "../../../../models/user/userODM"
import AuthService from "../../../../services/auth/authService"
import AuthController from "../../../../controllers/auth/authController"

describe('Testando a classe AuthController', () => {
  
  describe('Testando a função login', () => {
    afterEach(() => sinon.restore())

    const req = {
      body: {
        email: 'test@tet.com',
        password: '123456'
      }
    }

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub()
    }

    const authService = new AuthService(userODM)
    const authController = new AuthController(authService)

    it('Deve retorna o status e o objeto json corretamente', async () => {
      const token = 'asdhauioshduioahsdui.asdasd.....'

      sinon.stub(authService, 'login').resolves(token)

      await authController.login( req as Request, res as unknown as Response)

      expect(res.status.calledWith(200)).to.be.true
      expect(res.json.calledWith({ token })).to.be.true
    })
  })
})