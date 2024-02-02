import { describe, it } from "mocha";
import { expect } from "chai";
import sinon from "sinon";
import { Model } from "mongoose";
import PostODM from '../../../../models/post/PostODM'
import { IPostOutput } from "../../../../interfaces/IPost";

describe('Teste da classe PostODM', () => {
  
  const postOutput = {
    id: '123456',
    title: 'Teste',
    content: 'Testando',
    userId: 'af45a45f5a4f56a4f65a',
    published: new Date(),
    updatedAt: new Date()
  }

  const postInputWithUserId = {
    title: 'Teste',
    content: 'Testando',
    userId: 'af45a45f5a4f56a4f65a'
  }

  const postODM = PostODM;

  describe('Testando a função create', () => {
    afterEach(() => sinon.restore())

    it('Deve criar um post', async () => {
      const modelStub = sinon.stub(Model, 'create').resolves([postOutput] as IPostOutput[])

      const result = await postODM.create(postInputWithUserId)

      expect(result).to.deep.equal([postOutput])
      expect(modelStub.calledOnce).to.be.true
    })
  })

  describe('Testando a função getPostById', () => {
    it('Deve retornar um post', async () => {
      const modelStub = sinon.stub(Model, 'findById').resolves(postOutput as IPostOutput)

      const idPost = '123456'

      const result = await postODM.getPostById(idPost)

      expect(result).to.deep.equal(postOutput)
      expect(modelStub.calledOnce).to.be.true
    
    })
  })

  describe('Testando a função getAllPosts', () => {
    it('Deve retornar todos os posts', async () => {
      const modelStub = sinon.stub(Model, 'find').resolves([postOutput] as IPostOutput[])

      const result = await postODM.getAllPosts()

      expect(result).to.deep.equal([postOutput])
      expect(modelStub.calledOnce).to.be.true
    })
  })

  describe('Testando a função getPostAndDelete', () => {
    it('Deve deletar um post', async () => {
      const modelStub = sinon.stub(Model, 'findOneAndDelete').resolves(postOutput as IPostOutput)

      const idPost = '123456'
  
      const result = await postODM.getPostAndDelete(idPost)
  
      expect(result).to.deep.equal(postOutput)
      expect(modelStub.calledOnce).to.be.true

    })
  })

  describe('Testando a função getPostAndUpdate', () => {
    it('Deve atualizar um post', async () => {
      const modelStub = sinon.stub(Model, 'findOneAndUpdate').resolves(postOutput as IPostOutput)

      const idPost = '123'

      const result = await postODM.getPostAndUpdate(idPost, postInputWithUserId)

      expect(result).to.deep.equal(postOutput)
      expect(modelStub.calledOnce).to.be.true
    })
  })
})