/// <reference types="cypress" />
import contrato from '../contracts/usuarios.contract'

describe('Testes da Funcionalidade Usuários', () => {

  it('Deve validar contrato de usuários', () => {
    cy.request('usuarios').then(response =>{
      return contrato.validateAsync(response.body)
    }).should(response =>{
      expect(response.status).equal(undefined)
    })
  });

  it('Deve listar usuários cadastrados', () => {
    cy.request({
      method: 'GET',
      url: 'usuarios'
    }).should(response =>{
      expect(response.status).equal(200)
    })
  });

  it('Deve cadastrar um usuário com sucesso', () => {
    cy.request({
      method: 'POST',
      url: 'usuarios',
      body: {
        "nome": "João Silva",
        "email": "joaosilva@qa.com.br",
        "password": "teste",
        "administrador": "true"
      }
    }).should((response) =>{
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
    })
  });

  it('Deve deletar um usuário previamente cadastrado', () => {
    cy.request({
      method: 'DELETE',
      url: 'usuarios' + '/7VKNDb59apmLRxiQ'
    }).should(response =>{
      expect(response.status).equal(200)
    })
  });


});
