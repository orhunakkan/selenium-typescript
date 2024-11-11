import {afterAll, beforeAll, describe, expect, it} from 'vitest';
import {WebDriver} from 'selenium-webdriver';
import {getDriver} from "../utilities/sampleUtility";
import {SamplePage} from "../pages/samplePage";

describe('Formy Complete Web Form', () => {
    let driver: WebDriver;
    let samplePage: SamplePage;

    beforeAll(async () => {
        driver = await getDriver();
        samplePage = new SamplePage(driver);
    });

    afterAll(async () => {
        await driver.quit();
    });

    it('Submit Webform and Validate', async () => {
        await driver.get(`${samplePage.url}form`);
        await driver.findElement(samplePage.firstNameInput).sendKeys('John');
        await driver.findElement(samplePage.lastNameInput).sendKeys('Doe');
        await driver.findElement(samplePage.jobTitleInput).sendKeys('QA Engineer');
        await driver.findElement(samplePage.radioButton).click();
        await driver.findElement(samplePage.checkbox).click();
        await driver.findElement(samplePage.dropdownOption).click();
        await driver.findElement(samplePage.datepicker).sendKeys('01/01/2022');
        await driver.findElement(samplePage.submitButton).click();
        const successMessage = await driver.findElement(samplePage.successMessage).getText();
        expect(successMessage).toContain('The form was successfully submitted!');
    });
});