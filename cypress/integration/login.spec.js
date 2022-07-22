import { loginscreen } from "../support/login.page";
import { signup } from '../support/sign_up.page.js';

describe('Login to application',()=>{
    beforeEach(()=>{
        signup.open()
})

it("Login to application",()=>{
    loginscreen.login_to_application()
})
it("Invalid Login Credentials",()=>{
    loginscreen.invalid_credentials()
})
it("Create,Delete,Edit an article",()=>{
    loginscreen.login_to_application()
    loginscreen.createArticle()
    loginscreen.articleScreen()
    loginscreen.deletecomment()
    loginscreen.editArticle()
    loginscreen.deleteArticle()
})
it("Add fav",()=>{
    loginscreen.login_to_application()
    cy.get('.feed-toggle > .nav > :nth-child(2) > .nav-link').click()
    cy.wait(4000)
    loginscreen.favorites();

})
it("Follow Authors",()=>{
    loginscreen.login_to_application()
    cy.get('.feed-toggle > .nav > :nth-child(2) > .nav-link').click()
    cy.wait(2000)
    loginscreen. followAuthor()
})

it("Filtering with tags",()=>{
    loginscreen.login_to_application()
    cy.get('.feed-toggle > .nav > :nth-child(2) > .nav-link').click()
    cy.wait(2000)
    loginscreen. filter_tags()
})

afterEach(()=>{
    login.logout()//function to logout from application
})


})