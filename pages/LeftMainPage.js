import { BasePage } from "./BasePage.js";

export class LeftMainPage extends BasePage {
  /**
   * @param {import('playwright').Page} page
   */
  constructor(page) {
    super(page);

    this.cydeoImageAtLeftWindow = page.locator(
      "(//img[@src = 'assets/images/logo.svg'])[2]"
    );

    this.secureCheckout = page.locator("//p[@class='checkout-title']");

    this.footerElements = page.locator(
      "//a[contains(@href, 'https://cydeo.com/')]"
    );

    this.programName = page.locator("//p[@class='course-name']/a");
    
  }

  async isLogoBeforeTermsAndConditions() {
    return this.cydeoImageAtLeftWindow.evaluate((logo) => {
      const termsLink = Array.from(document.querySelectorAll("a")).find(
        (link) =>
          link.textContent.trim().toLowerCase() === "terms and conditions"
      );
      return Boolean(
        termsLink &&
          (logo.compareDocumentPosition(termsLink) &
            Node.DOCUMENT_POSITION_FOLLOWING)
      );
    });
  }

}
