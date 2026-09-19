import { Page } from '@playwright/test';
export class InventoryPage {
  constructor(private page: Page) {}
  async addProduct(product: string) {
    await this.page.locator(`text=${product}`)
      .locator('xpath=ancestor::div[@class="inventory_item"]')
      .locator('button')
      .click();
  }
  async goToCart() {
    await this.page.click('.shopping_cart_link');
  }
  async isProductVisible(product: string) {
    return await this.page.locator(`text=${product}`).isVisible();
  }
}