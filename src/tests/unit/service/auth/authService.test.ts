import { describe, it } from 'mocha';
import { expect } from 'chai';
import sinon from 'sinon';
import UserODM  from '../../../../models/user/userODM';
import { IUser } from '../../../../interfaces/IUser';
import AuthService from '../../../../services/auth/authService';
import bcryptjs from 'bcryptjs';
import { generateToken } from '../../../../middlewares/token';

describe('Testanto a classe AuthService', () => {
  const userInput = {
    email: 'test@test.com',
    password: bcryptjs.hashSync('123456', 10),
  };

  const userODM = UserODM;
  const authService = new AuthService(userODM);

  describe('Testando a função login', () => {
    afterEach(() => sinon.restore());

    it('Deve retornar um token', async () => {

      sinon.stub(userODM, 'getUserByEmail').resolves(userInput as IUser);
      sinon.stub(bcryptjs, 'compareSync').resolves(true);
      
      const result = await authService.login(userInput);
      generateToken(userInput.email)
      
      expect(result).to.be.a('string');

    })

    it('Deve retornar um erro 404 caso o usuário não exista', async () => {
      sinon.stub(userODM, 'getUserByEmail').resolves(null);

      try {
        await authService.login(userInput);
      } catch (err: any) {
        expect(err?.message).to.be.equal('404|User not found');
      }
    })

    it('Deve retornar um erro 401 caso a senha esteja incorreta', async () => {
      sinon.stub(userODM, 'getUserByEmail').resolves(userInput as IUser);
      sinon.stub(bcryptjs, 'compareSync').resolves(false);

      try {
        await authService.login(userInput);

      } catch (err: any) {
        expect(err?.message).to.be.equal('401|Incorrect password');
      }
    })

  })
})