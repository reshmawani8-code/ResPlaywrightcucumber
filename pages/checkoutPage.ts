import { Page } from '@playwright/test';
export class CheckoutPage {
  constructor(private page: Page) {}
  async clickCheckout() {
    await this.page.click('#checkout');
  }
  async enterDetails() {
    await this.page.fill('#first-name', 'Test');
    await this.page.fill('#last-name', 'User');
    await this.page.fill('#postal-code', '411001');
    await this.page.click('#continue');
  }
  async finishOrder() {
    await this.page.click('#finish');
  }
  async isOrderSuccess() {
  await this.page
    .getByText('Thank you for your order!', { exact: true })
    .waitFor({ state: 'visible' });
  return true;
}
}