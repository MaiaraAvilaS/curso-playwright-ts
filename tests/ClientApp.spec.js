const {test, expect} = require('@playwright/test');

test ('Browser Context Playwright Test', async ({page}) =>  //funcção anômima
{
   await page.goto("http://rahulshettyacademy.com/client/#/auth/login"); 
   await page.locator("#userEmail").fill("maiara.avila@acad.pucrs.br");
   await page.locator("#userPassword").fill("Maiara#12");
   await page.locator("[value = 'Login']").click();
   await page.waitForLoadState('networkidle')
  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles); 



});
