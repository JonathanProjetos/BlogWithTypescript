import { describe, it } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import UserODM  from '../../../../models/user/userODM';
import { Model } from 'mongoose';
import { IUser } from '../../../../interfaces/IUser';

describe('Teste da classe UserODM', () => {
  
  const user = {
    id:'123456', 
    email: 'test@test.com',
    password: '123456',
    displayName: 'Test',
  }

  describe('Testando a função create', () => {
    afterEach(() => sinon.restore())

    it('Deve criar um usuário', async () => {

      const userODM = UserODM

      const modelStub = sinon.stub(Model, 'create').resolves([user] as IUser[])

      const result = await userODM.create(user)

      expect(result).to.deep.equal([user])
      expect(modelStub.calledOnce).to.be.true
    })

  })

  describe('Testando a função getUserByEmail', () => {
    afterEach(() => sinon.restore())

    it('Deve retornar um usuário', async () => {

      const userODM = UserODM

      const modelStub = sinon.stub(Model, 'findOne').resolves(user as IUser)

      const result = await userODM.getUserByEmail(user.email)

      expect(result).to.deep.equal(user)
      expect(result).to.keys('id', 'email', 'password', 'displayName')
      expect(modelStub.calledOnce).to.be.true
    })
  })

  describe('Testando a função getUserById', () => {
    afterEach(() => sinon.restore())

    it('Deve retornar um usuário', async () => {

      const userODM = UserODM

      const modelStub = sinon.stub(Model, 'findOne').resolves(user as IUser)

      const result = await userODM.getUserById(user.id)

      expect(result).to.deep.equal(user)
      expect(result).to.keys('id', 'email', 'password', 'displayName')
      expect(modelStub.calledOnce).to.be.true
    })
  })

  describe('Testando a função getAllUsers', () => {
    afterEach(() => sinon.restore())

    it('Deve retornar um array de usuários', async () => {

      const userODM = UserODM

      const modelStub = sinon.stub(Model, 'find').resolves([user] as IUser[])

      const result = await userODM.getAllUsers()

      expect(result).to.deep.equal([user])
      expect(modelStub.calledOnce).to.be.true
    })
  })

  describe('Testando a função deleteUser', () => {
    afterEach(() => sinon.restore())

    it('Deve deletar um usuário', async () => {

      const userODM = UserODM

      const modelStub = sinon.stub(Model, 'findByIdAndDelete').resolves(user as IUser)

      const result = await userODM.getUserAndDelete(user.id)

      expect(result).to.deep.equal(user)
      expect(result).to.keys('id', 'email', 'password', 'displayName')
      expect(modelStub.calledOnce).to.be.true
    })
  })

  describe('Testando a função updateUser', () => {
    afterEach(() => sinon.restore())

    it('Deve retornar uma objeto com os dados atualizados', async () => {

      const userODM = UserODM

      const modelStub = sinon.stub(Model, 'findOneAndUpdate').resolves(user as IUser)

      const _id = user.id
      const result = await userODM.getUserAndUpdate(user, _id)

      expect(result).to.deep.equal(user)
      expect(modelStub.calledOnce).to.be.true
    })
  })

})