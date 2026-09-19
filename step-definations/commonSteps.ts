import { Given, When, Then, Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';
import assert from 'assert';

import { LoginPage } from '../pages/loginPage';
import { InventoryPage } from '../pages/inventoryPage';
import { CheckoutPage } from '../pages/checkoutPage';

let browser: Browser;
let page: Page;

let loginPage: LoginPage;
let inventoryPage: InventoryPage;
let checkoutPage: CheckoutPage;

setDefaultTimeout(30 * 1000);

Before(async () => {
  browser = await chromium.launch({
    headless: process.env.HEADLESS !== 'false',
    slowMo: process.env.HEADLESS === 'false' ? 250 : 0
  });
   page = await browser.newPage();

   loginPage = new LoginPage(page);
   inventoryPage = new InventoryPage(page);
   checkoutPage = new CheckoutPage(page);
});

Given('user is on login page', async () => {
   await loginPage.goto();
});

When('user enters username {string}', async (username: string) => {
   await page.fill('#user-name', username);
});

When('user enters password {string}', async (password: string) => {
   await page.fill('#password', password);
});

When('user clicks login button', async () => {
   await page.click('#login-button');
});

Then('user should be on inventory page', async () => {
   assert.ok(page.url().includes('inventory'));
});

Given('user is logged in', async () => {
   await loginPage.goto();
   await loginPage.login('standard_user', 'secret_sauce');
});

When('user adds {string} to cart', async (product: string) => {
   await inventoryPage.addProduct(product);
});

When('user goes to cart', async () => {
   await inventoryPage.goToCart();
});

Then('product {string} should be visible in cart', async (product: string) => {
   const visible = await inventoryPage.isProductVisible(product);
   assert.ok(visible);
});

Given('user has product in cart', async () => {
   await loginPage.goto();
   await loginPage.login('standard_user', 'secret_sauce');
   await inventoryPage.addProduct('Sauce Labs Backpack');
   await inventoryPage.goToCart();
});

When('user proceeds to checkout', async () => {
   await checkoutPage.clickCheckout();
});

When('user enters checkout details', async () => {
   await checkoutPage.enterDetails();
});

When('user finishes purchase', async () => {
   await checkoutPage.finishOrder();
});

Then('order should be successful', async () => {
   const success = await checkoutPage.isOrderSuccess();
   assert.ok(success);
});

After(async () => {
  if (browser) {
    await browser.close();
  }
});

