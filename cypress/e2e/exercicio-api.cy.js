/// <reference types="cypress" />
import contrato from '../contracts/usuarios.contract'
import { faker } from '@faker-js/faker';



describe('Testes da Funcionalidade Usuários', () => {

  it('Deve validar contrato de usuários', () => {
    cy.request('usuarios').then(response =>{
      return contrato.validateAsync(response.body)
    })
  });

  it('Deve listar usuários cadastrados', () => {
    cy.request({
      method: 'GET',
      url: 'usuarios'
    }).should(response =>{
      expect(response.status).equal(200)
      expect(response.body).to.have.property('usuarios')
    })
  });

  it('Deve cadastrar um usuário com sucesso', () => {
    cy.request({
      method: 'POST',
      url: 'usuarios',
      body: {
        "nome": faker.internet.userName(),
        "email": faker.internet.email(),
        "password": faker.internet.password(),
        "administrador": "true"
      }
    }).should(response =>{
      expect(response.status).equal(201)
      expect(response.body.message).equal('Cadastro realizado com sucesso')
    })
  });

  it('Deve validar um usuário com email inválido', () => {
    cy.request({
      method: 'POST',
      url: 'usuarios',
      body: {
        "nome": "Matheus",
        "email": "",
        "password": "teste",
        "administrador": "true"
      }, failOnStatusCode: false
    }).should((response) =>{
      expect(response.body.email).to.equal('email não pode ficar em branco')
      expect(response.status).equal(400)
  })
  });

  it('Deve editar um usuário previamente cadastrado', () => {
    cy.request({
      method: 'PUT',
      url: 'usuarios' + '/17ZqI1LtolLK9ThN',
      body: {
        "nome": "Matheus Silva",
        "email": "jo102384@qa.com.br",
        "password": "teste",
        "administrador": "true",
    },
    }).should(response =>{
      expect(response.status).equal(200)
      expect(response.body.message).equal('Registro alterado com sucesso')
    })
  });

  it('Deve deletar um usuário previamente cadastrado', () => {
    cy.request({
      method: 'DELETE',
      url: 'usuarios' + '/7vXcMOwU1lwjm18p'
    }).should(response =>{
      expect(response.status).equal(200)
      expect(response.body.message).equal('Registro excluído com sucesso')
    })
  });

  it('Buscar usuario por ID', () => {
    cy.request({
      method: 'GET',
      url: 'usuarios' + '/1WWqbwfssGDEEPDb'
    }).should(response =>{
      expect(response.status).equal(200)
      expect(response.body.nome).equal('Lonny_Hills23')
    })
  });


});
