import { loginscreen } from "../support/login.page";
import { signup } from '../support/sign_up.page.js';

describe('Login to application',()=>{
    beforeEach(()=>{
        signup.open()
})

it("Login to application",()=>{
    loginscreen.login_to_application()//login to application
})
it("Invalid Login Credentials",()=>{
    loginscreen.invalid_credentials()//login with invalid credentials
    loginscreen.login_to_application()
})
it("Create,Delete,Edit an article",()=>{
    loginscreen.login_to_application()//login to application
    cy.wait(2000)
    loginscreen.createArticle()//create an article
    loginscreen.articleScreen()//add comment
    loginscreen.deletecomment()//delete added comment
    loginscreen.editArticle()//perform edit by clicking on edit button
    loginscreen.deleteArticle()//delete article
})
it("Add fav",()=>{
    loginscreen.login_to_application()
    cy.get('.feed-toggle > .nav > :nth-child(2) > .nav-link').click()//click on global feed
    cy.wait(4000)
    loginscreen.favorites();//add favorites

})
it("Follow Authors",()=>{
    loginscreen.login_to_application()
    cy.get('.feed-toggle > .nav > :nth-child(2) > .nav-link').click()//click on global feed
    cy.wait(2000)
    loginscreen. followAuthor()//follow author
})

it("Filtering with tags",()=>{
    loginscreen.login_to_application()
    cy.get('.feed-toggle > .nav > :nth-child(2) > .nav-link').click()//click on global feed
    cy.wait(2000)
    loginscreen. filter_tags()//perform filter actions
})

afterEach(()=>{
    loginscreen.logout()//function to logout from application
})


})