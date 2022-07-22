import SignObj from '../fixtures/sign_up.json';

export default class Signup {
    open() 
    {
        cy.visit('https://demo.realworld.io/');//launching url
        return this;
    }
  
     typeUserName(user) {
      cy.wait(2000)
      cy.get(SignObj.Username).clear().type(user);//getting username
      return this;
    }
    typeEmail(email)
    {
       cy.get(SignObj.Email).clear().type(email);//getting email
        return this;  
    }
  
    typePassword(pwd) {
      cy.wait(2000)
      cy.get(SignObj.Password).clear().type(pwd, { log: false });//getting password
      return this;
    }
      signup_link()
      {
        cy.get('body > div > app-header > nav > div > ul:nth-child(2) > li:nth-child(3) > a').click()//click on signup hyperlink in the header
        cy.title().should('be.eq',"Sign up — Conduit");//verifying the title of the page
       }
    signUp_toNewuser(user,email, pwd) {
        
        return this.typeUserName(user).typeEmail(email).typePassword(pwd).sign_up();//signup with username,email,password
      }
    
    sign_up() {
      cy.wait(2000)
      cy.get(SignObj.Sign_up_Button).should('be.enabled').click();//check whether the sign up button is enabled and click on it.
      return this;
    }
    sign_in()
    {
        cy.get(SignObj.Sign_in).click()//click on sign in button
    }

  }

  export const signup = new Signup();

  