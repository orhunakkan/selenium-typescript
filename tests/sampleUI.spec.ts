import {afterAll, beforeAll, describe, expect, it} from 'vitest';
import {WebDriver} from 'selenium-webdriver';
import {getDriver} from "../utilities/sampleUtility";

const baseURL = 'https://formy-project.herokuapp.com/';

describe('Formy Complete Web Form', () => {
    let driver: WebDriver;

    beforeAll(async () => {
        driver = await getDriver()
    });

    afterAll(async () => {
        await driver.quit();
    });

    it('Submit Webform and Validate', async () => {
        await driver.get(`${baseURL}form`);
        await driver.findElement({id: 'first-name'}).sendKeys('John');
        await driver.findElement({id: 'last-name'}).sendKeys('Doe');
        await driver.findElement({id: 'job-title'}).sendKeys('QA Engineer');
        await driver.findElement({id: 'radio-button-2'}).click();
        await driver.findElement({id: 'checkbox-1'}).click();
        await driver.findElement({css: 'option[value="1"]'}).click();
        await driver.findElement({id: 'datepicker'}).sendKeys('01/01/2022');
        await driver.findElement({css: '.btn.btn-lg.btn-primary'}).click();
        const successMessage = await driver.findElement({css: '.alert.alert-success'}).getText();
        expect(successMessage).toContain('The form was successfully submitted!');
    });
});