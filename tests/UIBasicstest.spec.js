const {test, expect} = require('@playwright/test');

test('Browser Context Playwright Test', async ({browser}) =>  //funcção anômima
{
    //chrome - plugins/cookies    
      
        const context = await browser.newContext();
        const page = await context.newPage();
        const userName = page.locator("#username");  
        const signIn = page.locator("#signInBtn");
        const cardTitles = page.locator(".card-body a")
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");// page é o objeto criado
        console.log(await page.title());
        //css, xpath
        await userName.fill("rahulshetty");
        await page.locator("[type='password']").fill("Learning@830$3mK2");
        await signIn.click()
        console.log(await page.locator("[style*='block']").textContent());
        await expect(page.locator("[style*='block']")).toContainText('Incorrect');
        //fill 
        await userName.fill("");
        await userName.fill("rahulshettyacademy")
        await signIn.click()
        console.log(await cardTitles.first().textContent());
        console.log(await cardTitles.nth(1).textContent());
        const allTitles = await cardTitles.allTextContents();
        console.log(allTitles);


});

test('UI Controls', async ({page}) =>  
{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");// page é o objeto criado
    const userName = page.locator("#username");  
    const signIn = page.locator("#signInBtn");
    const documentLink = page.locator("[href*='documents-request']")
    const dropdown = page.locator("select.form-control");
    await dropdown.selectOption("consult");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    console.log(await page.locator(".radiotextsty").last().isChecked());
    await expect(page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy(); 
    await expect(documentLink).toHaveAttribute("class", "blinkingText");
    await page.waitForTimeout(1000);

        
});

test.only('Child Windows hadl', async ({browser}) =>
{                  
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator("#username"); 
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='documents-request']");
    
    const [newPage]= await Promise.all([

    context.waitForEvent('page'), 
    documentLink.click(),
    ])
    
    const text = await newPage.locator(".red").textContent();
    const arrayTest = text.split("@")
    const domain = arrayTest[1].split(" ")[0]
    //console.log(domain);
    await page.locator("#username").fill(domain);
    await page.pause();
    console.log(await page.locator("#username").inputValue()); 
})