@sep19
Feature: Click on the next button on step 1

    As a customer, I should be able to click on the next button on step 1 when I give valid information.

    #* AC1: The next button should take customers to step 2 when given valid information.
    #*              a. Test by providing all fields
    #*              b. Test by providing only the required fields
    

    Background:
        Given user is on the enrollment page

    @sep19-1
    Scenario Outline: Valid personal details advance the customer to step 2
        When the customer completes the "<field_set>" details and continues
        Then the payment plan options are displayed

        Examples:
            | field_set            |
            | all fields           |
            | required fields only |
