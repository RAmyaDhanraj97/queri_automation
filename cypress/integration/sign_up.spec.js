import { signup } from '../support/sign_up.page.js';
import SignObj from '../fixtures/sign_up.json';
var Chance = require('chance');//used thid library to generate randaom data fro username,email,password for signup screen
describe('signup', () => {
    it('Signup and Signout screen', () => {
      let username= Chance().name();//generating random name
      let email_id=Chance().email();//generating randon email
      let password=Chance().string();//generating random password
      signup.open(). signup_link();//launch url and click on sign up link
      signup.signUp_toNewuser(username,email_id,password);//enter username email password and click on signup button
      cy.wait(2000)
      cy.get(SignObj.Settings).click()//click on settings button
      cy.get(SignObj.Logout).click()//click on logout button
      cy.wait(2000)
      signup.open(). signup_link()//launch url and click on signup link
      signup.signUp_toNewuser(username,email_id,password);//enter username email password and click on signup button ,to check duplicate signup condition
      cy.wait(2000)
      cy.get('body').then($body=>{
        if($body.find('.error-messages > :nth-child(1) > .ng-binding').length > 0)//verified with field validation message
        {
            cy.wait(2000)
            cy.log("Username and email Id already exist")

       }
    })
})
  
it('validation for duplicate name in signup screen',()=>{
 let email_id=Chance().email();//generate random email
 signup.open(). signup_link()//launch url and click on signup link
 signup.signUp_toNewuser("Elmer Patton",email_id,"password")//provide already existing username and try to sign up
 cy.wait(2000)
 cy.get('div.ng-scope > .ng-binding').contains("username has already been taken").should('be.visible')//validation message should be displayed
})

it('validation for duplicate email_id in signup screen',()=>{
    let username= Chance().name();//generate random username
    signup.open(). signup_link()//launch url and click on signup link
    signup.signUp_toNewuser(username,"Testuser1@gmail.com","password")//provide already existing email and try to sign up
    cy.wait(2000)
    cy.get('div.ng-scope > .ng-binding').contains("email has already been taken").should('be.visible')//validation message should be displayed
   })

it("Make any one filed blank and check for validation message",()=>{
    let username= Chance().name();//generate random username
      let email_id=Chance().email();//generate random email id
      let password=Chance().string();//generate random password
    signup.open(). signup_link()//launch url and click on signup link
    signup.signUp_toNewuser("  ",email_id,password)//make username field blank enter other details and click on signup button
    cy.wait(2000)
    cy.get('div.ng-scope > .ng-binding').contains("username can't be blank").should('be.visible')//validation message should be displayed


    signup.signUp_toNewuser(username,"  ",password)//make email field as blank and enter other details and click on signup button
    cy.wait(4000)
    cy.get('div.ng-scope > .ng-binding').contains(`email can't be blank`).should('be.visible')//validation message should be displayed


    signup.open(). signup_link()
    signup.sign_up()//directly click on signup button without entering any details
    cy.wait(2000)
    cy.get('div.ng-scope > .ng-binding').contains(`email can't be blank`).should('be.visible')//validation message should be displayed



})

  });