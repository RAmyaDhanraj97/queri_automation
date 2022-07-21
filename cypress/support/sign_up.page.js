import SignObj from '../fixtures/sign_up.json';

export default class Signup {
    open() 
    {
        cy.visit('https://demo.realworld.io/');
        return this;
    }
  
     typeUserName(user) {
      cy.wait(2000)
      cy.get(SignObj.Username).clear().type(user);
      return this;
    }
    typeEmail(email)
    {
       cy.get(SignObj.Email).clear().type(email);
        return this;  
    }
  
    typePassword(pwd) {
      cy.wait(2000)
      cy.get(SignObj.Password).clear().type(pwd, { log: false });
      return this;
    }
      signup_link()
      {
        cy.get('body > div > app-header > nav > div > ul:nth-child(2) > li:nth-child(3) > a').click()
        cy.title().should('be.eq',"Sign up — Conduit");
       }
    signUp_toNewuser(user,email, pwd) {
        
        return this.typeUserName(user).typeEmail(email).typePassword(pwd).sign_up();
      }
    
    sign_up() {
      cy.wait(2000)
      cy.get(SignObj.Sign_up_Button).should('be.enabled').click();
      return this;
    }
    sign_in()
    {
        cy.get(SignObj.Sign_in).click()
    }
  
   
    login(user,pwd){
        return this.typeUserName(user).typePassword(pwd).sign_up();
    }
  
  logout()
  {
    cy.wait(4000)
    cy.contains('Logout').click()
    
  }

  }

  export const signup = new Signup();

  