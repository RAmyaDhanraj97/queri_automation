import loginObj from "../fixtures/login.json";

export default class LoginScreen{


    login_to_application()
    {
        cy.xpath(loginObj.Sign_in).click();//click on signin link in the header
        cy.title().should('be.eq',"Sign in — Conduit");//verify the title of the page
        cy.get(loginObj.Email).clear().type('ramyagowda.897@gmail.com')//enetr email field
        cy.get(loginObj.Password).clear().type('Ramya@2021')//enter password field
        cy.get(loginObj.Sign_IN_Button).click();//click on signin button
        cy.log('**Successfully logged in to application**')
    }
    invalid_credentials()
    {
        cy.xpath(loginObj.Sign_in).click();//click on signin link in the header
        cy.title().should('be.eq',"Sign in — Conduit");//verify the title of the page
        cy.get(loginObj.Email).clear().type('jak.897@gmail.com')//enter invalid email id
        cy.get(loginObj.Password).clear().type('Reya@2021')//enter incorrect password
        cy.get(loginObj.Sign_IN_Button).click();//click on signin button
        cy.xpath(loginObj.Error_Message).contains('email or password is invalid').should('be.visible')//validate error message
        cy.log('**Couldnt login as the credentials were invalid**')
    }
    createArticle()
    {
        cy.xpath(loginObj.NewArticle).click()//click on New Article button
        cy.title().should('be.eq','Editor — Conduit');//verify the title of the page
        cy.get(loginObj.ArticleTitle).type("Cypress Automation is in trend")//enter title of the article
        cy.get(loginObj.ArticleAbout).type("Cypress is a testing tool for modern web application")//enter article about info
        cy.get(loginObj.ArticleContent).type("Cypress is a testing tool for a modern web application,it uses javascript as a programming language")//enter article content
        cy.get(loginObj.Tags).type('Cypress')//enter tag
        cy.get(loginObj.PublishArticle).should('be.enabled').click()//click on publish article button
        cy.log('**Article created successfully**')
    }
    articleScreen()
    {
        cy.wait(2000)
        cy.xpath(loginObj.Usertext).invoke('text').then(username=>cy.log(username))//get name of the user
        cy.xpath(loginObj.EditArticle).should('be.visible',"be.enabled")//edit article button should be enabled
        cy.xpath(loginObj.DeleteArticle).should('be.visible',"be.enabled")//Delete article button should be enabled
        cy.get(loginObj.comment).type("Cypress testing")//enter comment for the article
        cy.xpath(loginObj.PostComment).click()//post the added comment,click on post comment button
        cy.xpath(loginObj.AddedComment).should('be.visible')//added comment should be visible
        cy.log('**Comment added  successfully**')
    }
    deletecomment()
    {
        cy.xpath(loginObj.DeleteComment).click()//click on Delete icon to delete comment
        cy.log("Comment Deleted")
        cy.get('div.card').should('not.exist')//verifying the comment box after delete,it should not exist
        cy.log('**Comment deleted successfully**')
    }
    editArticle()
    {
        cy.wait(2000)
        cy.xpath(loginObj.EditArticle).click()//click on edit aricle buttom
        cy.title().should('be.eq',"Editor — Conduit")//verify the title of the page
        cy.get(loginObj.ArticleTitle).clear().type("Cypress Automation is booming technology")//edit article title
        cy.get(loginObj.PublishArticle).should('be.enabled').click()//click pm publish article button
        cy.get('h1.ng-binding').should('have.text',"Cypress Automation is booming technology")//afer editing the title of the article should be changed.
        cy.log('**Edited article and verified article header after edit**')
    }
    deleteArticle()
    {
        cy.xpath(loginObj.DeleteArticle).click()//click on delete article icon
        cy.log('**Article Delted Successfully**')
        cy.title().should('be.eq',"Home — Conduit")//after delete screen should navigate to Home screen.
    }
    favorites()
    {
       cy.xpath(loginObj.fav1).invoke('text').then(parseFloat).then(count=>{//get the count/number from the favorites button
        cy.log(count)//log the count
        cy.xpath(loginObj.fav1).click()//click on the fav icon
        cy.wait(3000)
        cy.xpath(loginObj.fav1).invoke('text').then(parseFloat).should('be.gt',count);//after clicking on the fav icon check the count ,count should be greater after clicking on fav icon
       })
       cy.get(':nth-child(1) > .article-preview > .preview-link > h1.ng-binding').invoke('text').then(text=>{//get the text/author name from header 
        cy.get(':nth-child(4) > .nav-link').click()//click on userid in the header
        cy.wait(2000)
        cy.get('.articles-toggle > .nav > :nth-child(2) > .nav-link').click()//click on Favorited tab to check added fav appear here
        cy.wait(2000)
        cy.get(':nth-child(1) > .article-preview > .preview-link > h1.ng-binding').invoke('text').should('be.eq',text)//checking the author name is same when selected and here
       })


       cy.xpath(loginObj.HomeLink).click()//Home link
       cy.get(loginObj.GlobalFeed).click()//click on GLobal feed link
       cy.wait(3000)



        cy.xpath(loginObj.fav2).invoke('text').then(parseFloat).then(count1=>{//get the count from another fav button before click
        cy.log(count1)
        cy.xpath(loginObj.fav2).click()//click on another fav button
        cy.wait(3000)
        cy.xpath(loginObj.fav2).invoke('text').then(parseFloat).should('be.gt',count1);//count on fav icon should be greater after click
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
        cy.contains('Gerome').click()//click on Gerome author
        cy.get('h4.ng-binding').invoke('text').then(text1=>{//Get the author name
        cy.xpath('/html/body/div/div/div/div[1]/div/div/div/follow-btn/button').invoke('text')
        cy.xpath(loginObj.Follow).click()//click on follow button
        cy.log("Following Gerome")
        cy.wait(2000)
        cy.xpath(loginObj.HomeLink).click()//click on home link
        cy.wait(2000)
        cy.xpath(loginObj.Article_Preview).then($ArticleValues=>{//in the home screen check that under your feed it is listing Gerome user articles
                    const ArticlePreview=$ArticleValues.text()
                    expect(ArticlePreview).to.include(text1)//checking the author name displaying in your feed is same as the one which we followed
                    
                })
            
            })
    }
    addingcomment()
    {
        cy.get(':nth-child(1) > .article-preview > .preview-link > h1.ng-binding').click()//from your feed click on frst article
        cy.wait(2000)
            cy.get(loginObj.comment).type('Adding comments to the article')//add comment to the article
            cy.xpath(loginObj.PostComment).click()//post comment
            cy.xpath(loginObj.AddedComment).should('be.visible')//check whether the added comment is visible
            cy.wait(2000)

            cy.xpath(loginObj.HomeLink).click()//click on home link
            cy.get(loginObj.GlobalFeed).click()//click on global feed link
            cy.wait(2000)

    }

    filter_tags()
    {
        cy.get('.sidebar').should('be.visible')//side bar which contains tags should be visible
        cy.xpath('/html/body/div/div/div/div[2]/div/div[2]/div/div[1]/a').each(($el)=>{//get text of all tags
            cy.log($el.text())
        })

        //implementations
            cy.get('.sidebar > .tag-list > :nth-child(1)').click()//click on first tag,when clicked data will be displaying according to the tag set
            cy.wait(2000)
            cy.xpath(loginObj.List).should('include.text','implementations')//from the displayed list of article check it has 'implementations' as tag
            cy.wait(1000)
            cy.xpath(loginObj.HeaderText).should('include.text','implementations')//when tag is set ,make sure that tag name will be displayed in teh header as well
            this.addingcomment()//calling add comment to add comment after tags has been filtered/modfiying filtered data
            
        
            //welcome
            cy.wait(2000)
            cy.get('.sidebar > .tag-list > :nth-child(2)').click()//click on the second tag from the side bar
            cy.wait(3000)
            cy.xpath(loginObj.List).should('include.text','welcome')
            cy.wait(1000)
            cy.xpath(loginObj.HeaderText).should('include.text','welcome')
            this.addingcomment()

        }

        logout()
        {
            cy.get(loginObj.Settings).click()//click on settings
            cy.wait(2000)
            cy.xpath(loginObj.Logout).click()//click on logout 
            cy.log("Logged out from session")
        }

}

export const loginscreen = new LoginScreen()