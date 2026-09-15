
const { test, expect } = require('@playwright/test');

test('Client App login', async ({ page }) => {
    const email = "maiara.avila@acad.pucrs.br"
    const productName = 'ZARA COAT 3';
    const products = page.locator('.card-body');

    await page.goto('http://rahulshettyacademy.com/client/#/auth/login');

    await page.locator('#userEmail').fill(email);
    await page.locator('#userPassword').fill('Maiara#12');
    await page.locator("[value='Login']").click();

    await page.waitForLoadState('networkidle');

    await page.locator('.card-body b').first().waitFor();

    const titles = await page.locator('.card-body b').allTextContents();
    console.log(titles);

    const count = await products.count();

    for (let i = 0; i < count; ++i) {
        if (
            (await products.nth(i).locator('b').textContent()).trim() === productName

        ) {
            // Add to cart
            await products.nth(i).getByRole('button', { name: 'Add To Cart' }).click();


            break;
            await page.waitForTimeout(1000);
        }
    }

    await page.locator("[routerlink*='cart']").click();
    console.log(await page.locator("h3").allTextContents());

    //await page.waitForTimeout(5000); 
    //const bool = await page.getByText('ZARA COAT 3', { exact: true })

    
    await page.getByText('ZARA COAT 3', { exact: false }).waitFor({ state: 'visible', timeout: 30_000 });

    const bool  = await page.getByText('ZARA COAT 3', { exact: true }).isVisible();
    


    console.log(bool);
    expect(bool).toBeTruthy();

    await page.locator('button.btn-primary', { hasText: 'Checkout' }).click();

    await page.locator('.field.small').filter({ hasText: 'CVV Code' }).locator('input').fill("123");
    //await page.locator.getByRole('textbox').nth(1).fill("123");
    
    await page.locator("[placeholder*='Country']").pressSequentially('ind');

    const dropdown = page.locator('.ta-results');

    await dropdown.waitFor();

    const optionsCount = await dropdown.locator('button').count();

    for (let i = 0; i < optionsCount; ++i) {
        const text = await dropdown.locator('button').nth(i).textContent();

        if (text.trim() === 'India') {
            await dropdown.locator('button').nth(i).click();
            break;
        }
    }

    expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");

    for(let i=0; i<await rows.count(); ++i){

        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (orderId.includes(rowOrderId)){
            rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
});
