import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { leftMainPage, startApplicationPage } from "../../globalPagesSetup.js";
import { productInfo } from "../../utilities/qa-data-reader.js";

Then(
  "the product name is displayed on the information card",
  async function () {
    await expect(startApplicationPage.programNameOnInfoCard).toHaveText(
      productInfo.productName
    );
  }
);

Then(
  "the product name on the information card matches the product name on the left side of the screen",
  async function () {
    await expect(startApplicationPage.programNameOnInfoCard).toHaveText(
      productInfo.productName
    );
    const informationCardName =
      await startApplicationPage.programNameOnInfoCard.innerText();
    await expect(leftMainPage.programName).toHaveText(informationCardName);
  }
);

Then("the product price is displayed", async function () {
  const upfrontPrice = productInfo.prices.find(
    (price) => price.type === "one-time"
  );
  if (!upfrontPrice) {
    throw new Error("No one-time product price is available in catalog data.");
  }

  const expectedPrice =
    upfrontPrice.baseAmount -
    (upfrontPrice.upfrontDiscount ? upfrontPrice.upfrontDiscountAmount : 0);
  await expect(startApplicationPage.programPrice).toBeVisible();
  await expect(startApplicationPage.programPrice).toContainText(
    String(expectedPrice)
  );
});

Then("the flexible payment plan text is displayed", async function () {
  await expect(
    startApplicationPage.flexiblePaymentsPlanAvailableText
  ).toBeVisible();
});

Then("the return policy is displayed", async function () {
  await expect(startApplicationPage.returnPolicyText).toBeVisible();
});
