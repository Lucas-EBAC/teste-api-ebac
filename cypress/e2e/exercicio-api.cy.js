/// <reference types="cypress" />
import contrato from '../contracts/produtos.contract'

describe('Testes da Funcionalidade Usuários', () => {

  it.only('Deve validar contrato de usuários', () => {
    cy.request('produtos').then(response =>{
      return contrato.validateAsync(response.body)
    })
  });

  it('Deve listar usuários cadastrados', () => {
    cy.request({
      method: 'GET',
      url: 'usuarios'
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
    })
  });

  it('Deve deletar um usuário previamente cadastrado', () => {
    cy.request({
      method: 'DELETE',
      url: 'usuarios' + '/7VKNDb59apmLRxiQ'
    })
  });


});
