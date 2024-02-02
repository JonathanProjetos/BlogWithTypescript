import { describe, it } from 'mocha'
import { expect } from 'chai'
import sinon from 'sinon'
import UserODM  from '../../../../models/user/userODM'
import UserService from '../../../../services/user/userService'


describe('Teste da classe UserService', () => {
  const userInput = {
    email: 'test@test.com',
    password:'123456',
    displayName: 'Test'
  }

  const userOutput = {
    id: '123456',
    email: 'test@test.com',
    password: '123456',
    displayName: 'Test'
  }

  const userODM = UserODM
  const userService = new UserService(userODM)

  describe('Testando a função createUser', () => {
    afterEach(() => sinon.restore())

    it('Deve criar um usuário', async () => {
      sinon.stub(userODM, 'getUserByEmail').resolves(null)
      sinon.stub(userODM, 'create').resolves(userOutput)
  
      const result = await userService.createUser(userInput)

      expect(result).to.deep.equal(userOutput)
    })

    it('Deve retornar um erro 409 caso o usuário já exista', async () => {
      sinon.stub(userODM,'getUserByEmail').resolves(userOutput)
      sinon.stub(userODM, 'create').resolves(userOutput)
 

      try {
        await userService.createUser(userInput)
      } catch (err: any) {
        expect(err.message).to.be.equal('409|User already registered')
      }
    })

  })

  describe('Testando a função getUserById', () => {
    afterEach(() => sinon.restore())

    it('Deve retornar os dados de um usuário', async () => {
      sinon.stub(userODM, 'getUserById').resolves(userOutput)
      
      const id = '123456'
      const result = await userService.getUserById(id)

      expect(result).to.be.equal(userOutput)
    })

    it('Deve lançar um erro caso o usuário não esteja cadastrado', async () => {
      sinon.stub(userODM, 'getUserById').resolves(null)

      const id = '123456'

      try {
        await userService.getUserById(id)
      } catch (err: any) {
        expect(err.message).to.be.equal('404|User not found')
      }
    })
  })

  describe('Testando a função deleteUser', () => {
    afterEach(() => sinon.restore())

    it('Deve deletar um usuário com sucesso', async () => {
      sinon.stub(userODM, 'getUserByEmail').resolves(userOutput)
      sinon.stub(userODM, 'getUserAndDelete').resolves(userOutput)

      const userEmail = 'test@test.com'
      const id = '123456'

      const result = await userService.deleteUser(id, userEmail)

      expect(result).to.be.equal(userOutput)
    })

    it('Deve lançar um erro caso o email vindo pelo token seja tipo undefined ou vazio', async () => {
      const userEmail = ''
      const id = '123456'

      try {
        await userService.deleteUser(id, userEmail)
      } catch (err: any) {
        expect(err.message).to.be.equal('401|Unauthorized')
      }
    })

    it('Deve lançar um erro caso o usuário logado não exista no banco de dados', async () => {
      sinon.stub(userODM, 'getUserByEmail').resolves(null)

      const userEmail = 'test@test.com'
      const id = '123456'

      try {
        await userService.deleteUser(id, userEmail)
      } catch (err: any) {
        expect(err.message).to.be.equal('404|User not found')
      }
    })

    it('Deve lançar um erro caso os dados da pessoa autenticata seja divergentes com as informações no banco de dados', async () => {
      sinon.stub(userODM, 'getUserByEmail').resolves(userOutput)
      
      const userEmail = 'test@test.com'
      const id = '12345'

      try {
        await userService.deleteUser(id, userEmail)
      } catch (err: any) {
        expect(err.message).to.be.equal('401|Unauthorized')
      }
    })
  })

  describe('Testando a função updateUser', () => {
    afterEach(() => sinon.restore())

    const updatedInputUser = {
      email: 'test50@test.com',
      password: '123456',
      displayName: 'Test'
    }

    it('Deve ser possivel atualizar um usuário com sucesso', async () => {
      sinon.stub(userODM, 'getUserByEmail').resolves(userOutput)
      sinon.stub(userODM, 'getAllUsers').resolves([userOutput])
      sinon.stub(userODM, 'getUserAndUpdate').resolves(userOutput)

      const id = '123456'
      const userEmail = 'test@test.com'

      const result = await userService.updateUser(id, userEmail, updatedInputUser)

      expect(result).to.be.equal(userOutput)
    })

    it('Deve lançar um erro caso o email vindo pelo token seja tipo undefined ou vazio', async () => {
      const id = '123456'
      const userEmail = ''

      try {
        await userService.updateUser(id, userEmail, updatedInputUser)
      } catch (err: any) {
        expect(err.message).to.be.equal('401|Unauthorized')
      }
    })

    it('Deve lançar um erro caso o usuário não esteja presente no banco de dados', async () => {
      sinon.stub(userODM, 'getUserByEmail').resolves(null)

      const id = '123456'
      const userEmail = 'test@test.com'

      try {
        await userService.updateUser(id, userEmail, updatedInputUser)
      } catch (err: any) {
        expect(err.message).to.be.equal('404|User not found')
      }
    })

    it('Deve lançar um error caso o email do usuário já esteja cadastrado', async () => {
      sinon.stub(userODM, 'getUserByEmail').resolves(userOutput)
      sinon.stub(userODM, 'getAllUsers').resolves([userOutput])

      const id = '123456'
      const userEmail = 'test@test.com'

      try {
        await userService.updateUser(id, userEmail, userInput)
      } catch (err: any) {
        expect(err.message).to.be.equal('409|Email already registered')
      }
    })
  })
})