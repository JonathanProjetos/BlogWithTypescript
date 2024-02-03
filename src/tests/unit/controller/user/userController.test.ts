import type { Request, Response } from "express"
import { describe, it } from "mocha"
import { expect } from "chai"
import sinon from "sinon"
import userODM from "../../../../models/user/userODM"
import UserService from "../../../../services/user/userService"
import UserController from "../../../../controllers/user/userController"

describe('Testando a classe UserController', () => {

  const userService = new UserService(userODM)
  const useController = new UserController(userService)

  const res = {
    status: sinon.stub().returnsThis(),
    json: sinon.stub()
  }

  const userOutput = {
    id: '123456',
    email: 'test@test.com',
    password: '123456',
    displayName: 'Teste'
  }

  describe('Testando a função createUser', () => {
    afterEach(() => sinon.restore())

    it('Deve ser possível retornar o status e o objeto json corretamente', async () => {
      const stubUser = sinon.stub(userService, 'createUser').resolves(userOutput)

      const req = {
        body: {
          displayName:'Teste',
          email: 'test@test.com',
          password: '123456',
        },
        params: {
          id: '123456'
        }
      }

      await useController.createUser(req as unknown as Request, res as unknown as Response)

      expect(res.status.calledWith(201)).to.be.true
      expect(res.json.calledWith(userOutput)).to.be.true
      sinon.assert.calledWithExactly(stubUser, req.body)
    })
  })

  describe('Testando a função getUserById', () => {
    afterEach(() => sinon.restore())

    it('Deve ser possível retornar o status e o objeto json corretamente', async () => {
      const stubUser = sinon.stub(userService, 'getUserById').resolves(userOutput)

      const req = {
        body: {
          displayName:'Teste',
          email: 'test@test.com',
          password: '123456',
        },
        params: {
          id: '123456'
        }
      }

      await useController.getUserById(req as unknown as Request, res as unknown as Response)

      expect(res.status.calledWith(200)).to.be.true
      expect(res.status.calledWith(userOutput))
      sinon.assert.calledWithExactly(stubUser, req.params.id)
    })
  })

  describe('Testando a função deleteUser', () => {
    afterEach(() => sinon.restore())

    it('Deve ser possível retornar o status e o objeto json corretamente', async () => {
      const userStub = sinon.stub(userService, 'deleteUser').resolves(userOutput)

      const req = {
        body: {
          userEmail:'test@test.com'
        },
        params: {
          id: '123456'
        }
      }

      await useController.deleteUser(req as unknown as Request, res as unknown as Response)

      expect(res.status.calledWith(200)).to.be.true
      expect(res.json.calledWith(userOutput)).to.be.true
      sinon.assert.calledWithExactly(userStub, req.params.id, req.body.userEmail)
    })
  })

  describe('Testando a função updateUser', () => {
    afterEach(() => sinon.restore())

    it('Deve ser possível retornar o status e o objeto json corretamente', async () => {
      const stubUser = sinon.stub(userService, 'updateUser').resolves(userOutput)

      const req = {
        body: {
          displayName:'Teste',
          email: 'test@test.com',
          password: '123456',
          userEmail:'test@test.com'
        },
        params: {
          id: '123456'
        }
      }

      await useController.updateUser(req as unknown as Request, res as unknown as Response)

      const { email, password, displayName} = req.body

      expect(res.status.calledWith(200)).to.be.true
      expect(res.json.calledWith(userOutput)).to.be.true
      sinon.assert.calledWithExactly(
        stubUser, 
        req.params.id, 
        req.body.userEmail, 
        { email, password, displayName }
      )
    })
  })
})