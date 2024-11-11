import {afterAll, beforeAll, describe, expect, it} from 'vitest';
import {WebDriver} from 'selenium-webdriver';
import {getDriver} from "../utilities/sampleUtility";
import {SamplePage} from "../pages/samplePage";

describe('Formy Complete Web Form', () => {
    let driver: WebDriver;
    let samplePage: SamplePage;

    // Before all tests, initialize the WebDriver and SamplePage
    beforeAll(async () => {
        driver = await getDriver();
        samplePage = new SamplePage(driver);
    });

    // After all tests, quit the WebDriver
    afterAll(async () => {
        await driver.quit();
    });

    // Test to submit the web form and validate the success message
    it('Submit Webform and Validate', async () => {
        await driver.get(`${samplePage.url}form`); // Navigate to the form page
        await driver.findElement(samplePage.firstNameInput).sendKeys('John'); // Enter first name
        await driver.findElement(samplePage.lastNameInput).sendKeys('Doe'); // Enter last name
        await driver.findElement(samplePage.jobTitleInput).sendKeys('QA Engineer'); // Enter job title
        await driver.findElement(samplePage.radioButton).click(); // Select radio button
        await driver.findElement(samplePage.checkbox).click(); // Select checkbox
        await driver.findElement(samplePage.dropdownOption).click(); // Select dropdown option
        await driver.findElement(samplePage.datepicker).sendKeys('01/01/2022'); // Enter date
        await driver.findElement(samplePage.submitButton).click(); // Submit the form
        const successMessage = await driver.findElement(samplePage.successMessage).getText(); // Get the success message
        expect(successMessage).toContain('The form was successfully submitted!'); // Validate the success message
    });
});