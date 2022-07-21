import { signup } from '../support/sign_up.page.js';
import SignObj from '../fixtures/sign_up.json';
var Chance = require('chance');
describe('signup', () => {
    it('Signup and Signout screen', () => {
      let username= Chance().name();
      let email_id=Chance().email();
      let password=Chance().string();
      signup.open(). signup_link();
      signup.signUp_toNewuser(username,email_id,password);
      cy.wait(2000)
      cy.get(SignObj.Settings).click()
      cy.get(SignObj.Logout).click()
      cy.wait(2000)
      signup.open(). signup_link()
      signup.signUp_toNewuser(username,email_id,password);
      cy.wait(2000)
      cy.get('body').then($body=>{
        if($body.find('.error-messages > :nth-child(1) > .ng-binding').length > 0)
        {
            cy.wait(2000)
            cy.log("Username and email Id already exist")

       }
    })
})
  
it('validation for duplicate name in signup screen',()=>{
 let email_id=Chance().email();
 signup.open(). signup_link()
 signup.signUp_toNewuser("Elmer Patton",email_id,"password")
 cy.wait(2000)
 cy.get('div.ng-scope > .ng-binding').contains("username has already been taken").should('be.visible')
})

it('validation for duplicate email_id in signup screen',()=>{
    let username= Chance().name();
    signup.open(). signup_link()
    signup.signUp_toNewuser(username,"Testuser1@gmail.com","password")
    cy.wait(2000)
    cy.get('div.ng-scope > .ng-binding').contains("email has already been taken").should('be.visible')
   })

it("Make any one filed blank and check for validation message",()=>{
    let username= Chance().name();
      let email_id=Chance().email();
      let password=Chance().string();
    signup.open(). signup_link()
    signup.signUp_toNewuser("  ",email_id,password)
    cy.wait(2000)
    cy.get('div.ng-scope > .ng-binding').contains("username can't be blank").should('be.visible')


    signup.signUp_toNewuser(username,"  ",password)
    cy.wait(4000)
    cy.get('div.ng-scope > .ng-binding').contains(`email can't be blank`).should('be.visible')


    signup.open(). signup_link()
    signup.sign_up()
    cy.wait(2000)
    cy.get('div.ng-scope > .ng-binding').contains(`email can't be blank`).should('be.visible')



})

  });