import {Builder, WebDriver} from "selenium-webdriver";
import {promises as fs} from 'fs';
import path from 'path';

export async function getDriver(): Promise<WebDriver> {
    const driver = await new Builder().forBrowser('chrome').build();
    await driver.manage().setTimeouts({implicit: 10000});
    return driver;
}

export async function getPayloads() {
    const data = await fs.readFile(path.join(__dirname, '../payloads/samplePayload.json'), 'utf-8');
    return JSON.parse(data);
}