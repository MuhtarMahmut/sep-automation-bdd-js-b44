import { Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { paymentPlanPage, startApplicationPage } from "../../globalPagesSetup.js";

When("the customer completes the {string} details and continues", async function (fieldSet) {
    await startApplicationPage.enterFirstName(faker.person.firstName());
    await startApplicationPage.enterLastName(faker.person.lastName());
    await startApplicationPage.enterEmail(faker.internet.email());
    await startApplicationPage.enterPhoneNumber(faker.string.numeric(10));

    if (fieldSet === "all fields") {
        await startApplicationPage.selectHowDidYouHearAboutUs("Google");
    } else if (fieldSet !== "required fields only") {
        throw new Error(`Unsupported personal-details field set: ${fieldSet}`);
    }

    await startApplicationPage.clickNextButton();
});

Then("the payment plan options are displayed", async function () {
    await expect(paymentPlanPage.chooseAPaymentPlanText).toBeVisible();
});
