import type { Request, Response } from "express"
import { describe, it } from "mocha"
import { expect } from "chai"
import sinon from "sinon"
import userODM from "../../../../models/user/userODM"
import PostService from "../../../../services/post/postService"
import PostController from "../../../../controllers/post/postController"
import PostODM from "../../../../models/post/PostODM"

describe('Testando a classe PostController', () => {

  const postService = new PostService(PostODM, userODM)
  const postController = new PostController(postService)

  const res = {
    status: sinon.stub().returnsThis(),
    json: sinon.stub()
  }

  const req = {
    body: {
      title: 'teste',
      content: 'teste',
      userEmail: 'test@test.com'
    }, 
    params: {
      id:'123456'
    }
  }

  const postOutput = {
    id: '123456',
    title: 'Teste',
    content: 'Testando',
    userId: '1234567',
    published: new Date(),
    updatedAt: new Date()
  }

  describe('Testando a função createPost', () => {
    afterEach(() => sinon.restore())

    it('Deve ser possível retornar o status e o objeto json corretamente', async () => {
      const stubPost = sinon.stub(postService, 'createPost').resolves(postOutput)

      await postController.createPost(req as unknown as Request, res as unknown as Response)

      const { title, content, userEmail } = req.body

      expect(res.status.calledWith(201)).to.be.true
      expect(res.json.calledWith(postOutput)).to.be.true
      sinon.assert.calledWithExactly(stubPost, { title, content }, userEmail)
    })
  })

  describe('Testando a função getAllPosts', () => {
    afterEach(() => sinon.restore())

    it('Deve ser possível retornar o status e o objeto json corretamente', async () => {
      const stubPost = sinon.stub(postService, 'getAllPosts').resolves([postOutput])

      await postController.getAllPosts(req as unknown as Request, res as unknown as Response)

      expect(res.status.calledWith(200)).to.be.true
      expect(res.json.calledWith([postOutput])).to.be.true
      sinon.assert.calledWithExactly(stubPost)
    })
  })

  describe('Testando a função getPostById', () => {
    afterEach(() => sinon.restore())

    it('Deve ser possível retornar o status e o objeto json corretamente', async () => {
      const stubPost = sinon.stub(postService, 'getPostById').resolves(postOutput)

      await postController.getPostById(req as unknown as Request, res as unknown as Response)

      const { id } = req.params

      expect(res.status.calledWith(200)).to.be.true
      expect(res.json.calledWith(postOutput)).to.be.true
      sinon.assert.calledWithExactly(stubPost, id)
    })
  })

  describe('Testando a função updatePost', () => {
    afterEach(() => sinon.restore())

    it('Deve ser possível retornar o status e o objeto json corretamente', async () => {
      const stubPost = sinon.stub(postService, 'updatePost').resolves(postOutput)

      await postController.updatePost(req as unknown as Request, res as unknown as Response)

      const { id } = req.params
      const { title, content, userEmail } = req.body

      expect(res.status.calledWith(200)).to.be.true
      expect(res.json.calledWith(postOutput)).to.be.true
      sinon.assert.calledWithExactly(stubPost, id, userEmail, { title, content })
    })
  })

  describe('Testando a função deletePost', () => {
    afterEach(() => sinon.restore())

    it('Deve ser possível retornar o status e o objeto json corretamente', async () => {
      const stubPost = sinon.stub(postService, 'deletePost').resolves(postOutput)

      await postController.deletePost(req as unknown as Request, res as unknown as Response)

      const { id } = req.params
      const { userEmail } = req.body

      expect(res.status.calledWith(200)).to.be.true
      expect(res.json.calledWith(postOutput)).to.be.true
      sinon.assert.calledWithExactly(stubPost, id, userEmail)
    })
  })
})