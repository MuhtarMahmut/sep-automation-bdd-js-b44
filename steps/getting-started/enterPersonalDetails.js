import { Then, When } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { startApplicationPage } from "../../globalPagesSetup.js";

Then(
  "the personal detail fields have the expected types and are displayed",
  async function () {
    await expect(startApplicationPage.firstNameInputBox).toHaveJSProperty(
      "type",
      "text"
    );
    await expect(startApplicationPage.lastNameInputBox).toHaveJSProperty(
      "type",
      "text"
    );
    await expect(startApplicationPage.emailInputBox).toHaveAttribute(
      "type",
      "email"
    );
    await expect(startApplicationPage.phoneNumberInputBox).toBeVisible();
  }
);

Then("the phone number field accepts digits only", async function () {
  await startApplicationPage.phoneNumberInputBox.fill("");
  await startApplicationPage.phoneNumberInputBox.press("a");
  await expect(startApplicationPage.phoneNumberInputBox).toHaveValue("");
});

When(
  "the customer opens the how did you hear about us dropdown",
  async function () {
    await startApplicationPage.howDidYouHearAboutUsDropDown.click();
  }
);

Then("the standard referral options are displayed", async function () {
  await expect(
    startApplicationPage.howDidYouHearAboutUsOptions
  ).toHaveCount(9);
});

When(
  "the customer fills all required details except {string} with {string}",
  async function (field, value) {
    await startApplicationPage.enterFirstName(faker.person.firstName());
    await startApplicationPage.enterLastName(faker.person.lastName());
    await startApplicationPage.enterEmail(faker.internet.email());
    await startApplicationPage.enterPhoneNumber(faker.string.numeric(10));

    const fieldLocators = {
      "first name": startApplicationPage.firstNameInputBox,
      "last name": startApplicationPage.lastNameInputBox,
      "email address": startApplicationPage.emailInputBox,
      phone: startApplicationPage.phoneNumberInputBox,
    };
    const target = fieldLocators[field.toLowerCase()];
    if (!target) {
      throw new Error(`Unsupported personal detail field: ${field}`);
    }

    await target.fill(value);
  }
);

Then(
  "the Next button is disabled when required details are invalid",
  async function () {
    await expect(startApplicationPage.nextButton).toBeDisabled();
  }
);
