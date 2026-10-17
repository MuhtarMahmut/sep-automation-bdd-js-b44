import { Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { startApplicationPage } from "../../globalPagesSetup.js";

Then("the checkout process steps are displayed in order", async function () {
  await expect(startApplicationPage.stepNumbers).toHaveText(["1", "2", "3"]);
  await expect(startApplicationPage.stepTitles).toHaveText([
    "Start Application",
    /^Payment plan$/i,
    "Review",
  ]);
});

Then("the start application stepper circle is blue", async function () {
  await expect(startApplicationPage.startApplicationStepCircle).toHaveCSS(
    "background-color",
    "rgb(1, 201, 255)"
  );
});

Then("the payment plan and review step labels are grey", async function () {
  await expect(startApplicationPage.paymentPlanText).toBeVisible();
  await expect(startApplicationPage.paymentPlanText).toHaveCSS(
    "color",
    "rgb(130, 154, 177)"
  );
  await expect(startApplicationPage.reviewText).toBeVisible();
  await expect(startApplicationPage.reviewText).toHaveCSS(
    "color",
    "rgb(130, 154, 177)"
  );
});
