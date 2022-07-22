import loginObj from "../fixtures/login.json";

export default class LoginScreen{


    login_to_application()
    {
        cy.xpath(loginObj.Sign_in).click();
        cy.title().should('be.eq',"Sign in — Conduit");
        cy.get(loginObj.Email).clear().type('ramyagowda.897@gmail.com')
        cy.get(loginObj.Password).clear().type('Ramya@2021')
        cy.get(loginObj.Sign_IN_Button).click();
    }
    invalid_credentials()
    {
        cy.xpath(loginObj.Sign_in).click();
        cy.title().should('be.eq',"Sign in — Conduit");
        cy.get(loginObj.Email).clear().type('jak.897@gmail.com')
        cy.get(loginObj.Password).clear().type('Reya@2021')
        cy.get(loginObj.Sign_IN_Button).click();
        cy.xpath(loginObj.Error_Message).contains('email or password is invalid').should('be.visible')
    }
    createArticle()
    {
        cy.get(loginObj.NewArticle).click()
        cy.title().should('be.eq','Editor — Conduit');
        cy.get(loginObj.ArticleTitle).type("Cypress Automation is in trend")
        cy.get(loginObj.ArticleAbout).type("Cypress is a testing tool for modern web application")
        cy.get(loginObj.ArticleContent).type("Cypress is a testing tool for a modern web application,it uses javascript as a programming language")
        cy.get(loginObj.Tags).type('Cypress')
        cy.get(loginObj.PublishArticle).should('be.enabled').click()
    }
    articleScreen()
    {
        cy.wait(2000)
        cy.xpath(loginObj.Usertext).invoke('text').then(username=>cy.log(username))
        cy.xpath(loginObj.EditArticle).should('be.visible',"be.enabled")
        cy.xpath(loginObj.DeleteArticle).should('be.visible',"be.enabled")
        cy.get(loginObj.comment).type("Cypress testing")
        cy.xpath(loginObj.PostComment).click()
        cy.xpath(loginObj.AddedComment).should('be.visible')
    }
    deletecomment()
    {
        cy.xpath(loginObj.DeleteComment).click()
        cy.log("Comment Deleted")
        cy.get('div.card').should('not.exist')
    }
    editArticle()
    {
        cy.wait(2000)
        cy.xpath(loginObj.EditArticle).click()
        cy.title().should('be.eq',"Editor — Conduit")
        cy.get(loginObj.ArticleTitle).clear().type("Cypress Automation is booming technology")
        cy.get(loginObj.PublishArticle).should('be.enabled').click()
        cy.get('h1.ng-binding').should('have.text',"Cypress Automation is booming technology")
    }
    deleteArticle()
    {
        cy.xpath(loginObj.DeleteArticle).click()
        cy.log("Article Delted Successfully")
        cy.title().should('be.eq',"Home — Conduit")
    }
    favorites()
    {
       cy.xpath(loginObj.fav1).invoke('text').then(parseFloat).then(count=>{
        cy.log(count)
        cy.xpath(loginObj.fav1).click()
        cy.wait(3000)
        cy.xpath(loginObj.fav1).invoke('text').then(parseFloat).should('be.gt',count);
       })
       cy.get(':nth-child(1) > .article-preview > .preview-link > h1.ng-binding').invoke('text').then(text=>{
        cy.get(':nth-child(4) > .nav-link').click()
        cy.wait(2000)
        cy.get('.articles-toggle > .nav > :nth-child(2) > .nav-link').click()
        cy.wait(2000)
        cy.get(':nth-child(1) > .article-preview > .preview-link > h1.ng-binding').invoke('text').should('be.eq',text)
       })


       cy.xpath(loginObj.HomeLink).click()//Home link
       cy.get(loginObj.GlobalFeed).click()
       cy.wait(3000)



        cy.xpath(loginObj.fav2).invoke('text').then(parseFloat).then(count1=>{
        cy.log(count1)
        cy.xpath(loginObj.fav2).click()
        cy.wait(3000)
        cy.xpath(loginObj.fav2).invoke('text').then(parseFloat).should('be.gt',count1);
       })
       cy.get(':nth-child(2) > .article-preview > .preview-link > h1.ng-binding').invoke('text').then(text1=>{
        cy.get(':nth-child(4) > .nav-link').click()
        cy.wait(2000)
        cy.get('.articles-toggle > .nav > :nth-child(2) > .nav-link').click()
        cy.wait(2000)
        cy.get(':nth-child(2) > .article-preview > .preview-link > h1.ng-binding').invoke('text').should('be.eq',text1)
       })
       

    }
    
    followAuthor()
    {
        cy.contains('Gerome').click()
        cy.get('h4.ng-binding').invoke('text').then(text1=>{
        cy.xpath('/html/body/div/div/div/div[1]/div/div/div/follow-btn/button').invoke('text')
        cy.xpath(loginObj.Follow).click()
        cy.log("Following Gerome")
        cy.wait(2000)
        cy.xpath(loginObj.HomeLink).click()
        cy.wait(2000)
        cy.xpath(loginObj.Article_Preview).then($ArticleValues=>{
                    const ArticlePreview=$ArticleValues.text()
                    expect(ArticlePreview).to.include(text1)
                    
                })
            
            })
    }

    filter_tags()
    {
        cy.get('.sidebar').should('be.visible')
        cy.xpath('/html/body/div/div/div/div[2]/div/div[2]/div/div[1]/a').each(($el)=>{
            cy.log($el.text())
        })
            cy.get('.sidebar > .tag-list > :nth-child(1)').click()
            cy.wait(2000)
            cy.xpath(loginObj.List).should('include.text','implementations')
            cy.wait(1000)
            cy.xpath(loginObj.HeaderText).should('include.text','implementations')

            
        

            cy.wait(2000)
            cy.contains('welcome').click()
            cy.wait(1000)
            cy.xpath(loginObj.List).should('include.text','welcome')
            cy.wait(1000)
            cy.xpath(loginObj.HeaderText).should('include.text','welcome')

            cy.wait(2000)
            cy.contains('codebaseShow').click()
            cy.wait(1000)
            cy.xpath(loginObj.List).should('include.text','codebaseShow')
            cy.wait(1000)
            cy.xpath(loginObj.HeaderText).should('include.text','codebaseShow')

        }

}

export const loginscreen = new LoginScreen()