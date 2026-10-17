@sep10
Feature: Enter my Personal details

    As a customer, I should be able to enter my Personal details.

    #* AC1: Default field types and values should be as follows:
    #*          a. First Name: Text field is present.
    #*          b. Last Name: Text field is present.
    #*          c. Email Address: Text field is present and validates for email format.
    #*          d. Phone: The field allows numbers only.

    #* AC2: "How did you hear about us?" A standard dropdown list is present.
    #* AC3: The 'Next' button should be disabled if any required data is missing or invalid.

    Background:
        Given user is on the enrollment page

    @sep10-1
    Scenario: Required personal detail fields use the expected types
        Then the personal detail fields have the expected types and are displayed
        And the phone number field accepts digits only

    @sep10-2
    Scenario: The how did you hear about us dropdown is available
        When the customer opens the how did you hear about us dropdown
        Then the standard referral options are displayed

    @sep10-3
    Scenario Outline: The Next button stays disabled for missing or invalid required details
        When the customer fills all required details except "<field>" with "<value>"
        Then the Next button is disabled when required details are invalid

        Examples:
            | field         | value         |
            | First Name    |               |
            | Last Name     |               |
            | Email Address |               |
            | Email Address | invalid-email |
            | Phone         |               |
            | Phone         | 12abc         |