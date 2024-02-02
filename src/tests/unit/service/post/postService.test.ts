import { describe, it } from 'mocha'
import { expect } from 'chai'
import sinon from 'sinon'
import UserODM  from '../../../../models/user/userODM'
import PostODM from '../../../../models/post/PostODM'
import PostService from '../../../../services/post/postService'

describe('Testando a classe PostService', () => {

  const postIput = {
    title: 'Bora testar',
    content: 'Com a afé me deus vai passar sem falso positivo'
  }

  const postOutput = {
    id: '123456',
    title: 'Teste',
    content: 'Testando',
    userId: '1234567',
    published: new Date(),
    updatedAt: new Date()
  }

  const userOutput = {
    id: '1234567',
    email: 'test@test.com',
    password: '123456',
    displayName: 'Test'
  }

  const userODM = UserODM
  const postODM = PostODM

  const postService = new PostService(postODM, userODM)

  describe('Testando a função createPost', () => {
    afterEach(() => sinon.restore())

    it('Deve criar um post com sucesso', async () => {
      sinon.stub(userODM, 'getUserByEmail'). resolves(userOutput)
      sinon.stub(postODM, 'create').resolves(postOutput)

      const userEmail = 'test@test.com'

      const result = await postService.createPost(postIput, userEmail)

      expect(result).to.deep.equal(postOutput)
    })

    it('Deve lançar um erro caso o email provido pelo token seja undefined ou vazio', async () => {
      const userEmail = ''

      try {
        await postService.createPost(postIput, userEmail)
      } catch (err: any) {
        expect(err.message).to.deep.equal('401|Unauthorized')
      }
    })

    it('Deve lançar um erro caso a pessoa não exista no banco de dados', async () => {
      sinon.stub(userODM, 'getUserByEmail').resolves(null)

      const userEmail = 'test@test.com'

      try {
        await postService.createPost(postIput, userEmail)
      } catch (err: any) {
        expect(err.message).to.deep.equal('404|User is not registered')
      }
    })

    it('Deve lancar um erro caso o userId não seja localizado', async() => {
      const user = {
        id: undefined,
        email: 'test@test.com',
        password: '123456',
        displayName: 'Test'
      }

      sinon.stub(userODM, 'getUserByEmail').resolves(user)

      const userEmail = 'test@test.com'

      try {
        await postService.createPost(postIput, userEmail)
      } catch (err: any) {
        expect(err.message).to.deep.equal('404|Unable to locate user ID')
      }
    })
  })

  describe('Testando a função getAllPosts', () => {
    afterEach(() => sinon.restore())

    it('Deve retornar um array com todos os posts', async () => {
      sinon.stub(postODM, 'getAllPosts').resolves([postOutput])

      const result = await postService.getAllPosts()

      expect(result).to.deep.equal([postOutput])
    })

    it('Deve lançar um erro caso não exista posts', async () => {
      sinon.stub(postODM, 'getAllPosts').resolves(null)

      try {
        await postService.getAllPosts()
      } catch (err: any) {
        expect(err.message).to.be.equal('404|Posts not found')
      }
    })
  })
  describe('Testando a função getPostById', () => {
    afterEach(()=> sinon.restore())

    it('Deve retornar um post vinculado ao id', async () => {
      sinon.stub(postODM, 'getPostById').resolves(postOutput)

      const id = '123456'

      const result = await postService.getPostById(id)

      expect(result).to.deep.equal(postOutput)
    })

    it('Deve lançar um erro caso o id seja undefined ou vazio', async () => {
      const id = ''

      try {
        await postService.getPostById(id)
      } catch (err: any) {
        expect(err.message).to.deep.equal('404|Unable to locate user id')
      }
    })

    it('Deve lançar um erro caso o post não exista', async () => {
      sinon.stub(postODM, 'getPostById').resolves(null)

      const id = '123456'

      try {
        await postService.getPostById(id)
      } catch (err: any) {
        expect(err.message).to.deep.equal('404|Posts not found')
      }
    })
  })
  describe('Testando a função updatePost', () => {
    afterEach(() => sinon.restore())

    it('Deve retorna um post atualizado com sucesso', async () => {
      sinon.stub(userODM, 'getUserByEmail').resolves(userOutput)
      sinon.stub(postODM, 'getPostById').resolves(postOutput)
      sinon.stub(postODM, 'getPostAndUpdate').resolves(postOutput)

      const id = '123456'
      const userEmail = 'test@test.com'

      const result = await postService.updatePost(id, userEmail, postIput)

      expect(result).to.deep.equal(postOutput)
    })

    it('Deve lançar um erro caso o id seja undefined ou vazio', async () => {
      const id = ''
      const userEmail = 'test@test.com'

      try {
        await postService.updatePost(id, userEmail, postIput)
      } catch (err: any) {
        expect(err.message).to.be.equal('404|Unable to locate user ID')
      }
    })

    it('Deve lançar um erro caso o email provido pe token seja undefined ou vazio', async () => {
      const id ='123456'
      const userEmail = ''

      try {
        await postService.updatePost(id, userEmail, postIput)
      } catch (err: any) {
        expect(err.message).to.deep.equal('401|Unauthorized')
      }
    })

    it('Deve lançar um erro caso os dados do usuário não exista no banco de dados', async () => {
      sinon.stub(userODM, 'getUserByEmail').resolves(null)

      const id = '123456'
      const userEmail = 'test@test.com'

      try {
        await postService.updatePost(id, userEmail, postIput)
      } catch (err: any) {
        expect(err.message).to.deep.equal('404|User is not registered')
      }
    })

    it('Deve lançar um erro caso os dados da pessoa autenticada não corresponda com os dados do post', async () => {
      const errorPost = {
        id: '123456',
        title: 'Teste',
        content: 'Testando',
        userId: '99999999',
        published: new Date(),
        updatedAt: new Date()
      }
      
      sinon.stub(userODM, 'getUserByEmail').resolves(userOutput)
      sinon.stub(postODM, 'getPostById').resolves(errorPost)

      const id = '123456'
      const userEmail = 'test@test.com'

      try {
        await postService.updatePost(id, userEmail, postIput)
      } catch (err: any) {
        expect(err.message).to.deep.equal('401|Unauthorized')
      }
    })
  })
  describe('Testando a função deletePost', () => {
    afterEach(() => sinon.restore())

    it('Deve ser possivel deletar um post com sucesso', async () => {
      sinon.stub(userODM, 'getUserByEmail').resolves(userOutput)
      sinon.stub(postODM, 'getPostById').resolves(postOutput)
      sinon.stub(postODM, 'getPostAndDelete').resolves(postOutput)


      const id = '123456'
      const userEmail = 'test@test.com'

      const result = await postService.deletePost(id, userEmail)

      expect(result).to.be.equal(postOutput)
    })

    it('Deve lançar um erro caso o id seja undefined ou vazio', async () => {
      const id = ''
      const userEmail = 'test@test.com'

      try {
        await postService.deletePost(id, userEmail)
      } catch (err: any) {
        expect(err.message).to.deep.equal('404|Unable to locate user ID')
      }
    })

    it('Deve lançar um erro caso o userEmail provido pelo token seja undefined ou vazio', async () => {
      const id = '1234546'
      const userEmail = ''

      try {
        await  postService.deletePost(id, userEmail)
      } catch (err: any) {
        expect(err.message).to.deep.equal('401|Unauthorized')
      }
    })

    it('Deve lançar um erro caso a pessoa usuária não esteja cadastrada no banco de dados', async () => {
      sinon.stub(userODM, 'getUserByEmail').resolves(null)

      const id = '123456'
      const userEmail = 'test@test.com'

      try {
        await postService.deletePost(id, userEmail)
      } catch (err: any) {
        expect(err.message).to.deep.equal('404|User not found')
      }
    })

    it('Deve lançar um erro caso o id pessoa autenticada não seja correspondente a informação de userId', async () => {
      const errorPost = {
        id: '123456',
        title: 'Teste',
        content: 'Testando',
        userId: '99999999',
        published: new Date(),
        updatedAt: new Date()
      }

      sinon.stub(userODM, 'getUserByEmail').resolves(userOutput)
      sinon.stub(postODM, 'getPostById').resolves(errorPost)

      const id = '123456'
      const userEmail = 'test@test.com'
    
      try {
        await postService.deletePost(id, userEmail)
      } catch (err: any) {
        expect(err.message).to.deep.equal('401|Unauthorized')
      }

    })
  })
})