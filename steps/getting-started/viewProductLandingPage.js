import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { leftMainPage, startApplicationPage } from "../../globalPagesSetup.js";
import { productInfo } from "../../utilities/qa-data-reader.js";

Then("the secure checkout heading is displayed", async function () {
  await expect(leftMainPage.secureCheckout).toHaveText(
    "Cydeo Secure Checkout"
  );
});

Then("the program name is displayed on the landing page", async function () {
  await expect(leftMainPage.programName).toHaveText(productInfo.programName);
});

Then("the left footer logo and links are displayed in order", async function () {
  await expect(leftMainPage.cydeoImageAtLeftWindow).toBeVisible();
  await expect(leftMainPage.footerElements).toHaveText([
    /^Terms and Conditions$/i,
    "Privacy Policy",
    "Disclaimer",
    "Cookie Policy",
  ]);
  await expect
    .poll(() => leftMainPage.isLogoBeforeTermsAndConditions())
    .toBe(true);
});

Then(
  "the enrollment help contact is displayed in the right footer",
  async function () {
    await expect(startApplicationPage.footer).toContainText(
      "Need help? Contact us at enrollment@cydeo.com"
    );
  }
);
