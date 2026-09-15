import {test, expect} from '@playwright/test';

test ('Playwright Special locators', async ({ page }) => {

    await page.goto("https://rahulshettyacademy.com/angularpractice");
    await page.getByLabel("Check me out if you love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("abc123");
    await page.getByRole("button", {name:'Submit'}).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();

    //Timeout padrão de 5 segundos para as asserções esperadas
    await expect(page.getByText("Success! The Form has been submitted successfully!.").toBeVisible(); 

    await page.getByRole("link", {name: "Shop"}).click();
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();
});


test ('Playwright Test level time out', async ({ page }) => {

    const slowExpect = expect.configure({timeout:9000})
    page.setDefaultTimeout(9000);
    await page.goto("https://rahulshettyacademy.com/angularpractice");
    await page.getByLabel("Check me out if you love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("abc123");
    await page.getByRole("button", {name:'Submit'}).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();

    //Timeout padrão de 5 segundos para as asserções esperadas
    await slowExpect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible(); 

    await page.getByRole("link", {name: "Shop"}).click();
    await expect(page.locator(".my-4").first()).toHaveText("Shop");
    //2 more
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();
});
