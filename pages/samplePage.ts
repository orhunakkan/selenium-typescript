import {By, WebDriver} from 'selenium-webdriver';

export class SamplePage {

    readonly driver: WebDriver;
    readonly url: string = 'https://formy-project.herokuapp.com/';
    readonly firstNameInput: By;
    readonly lastNameInput: By;
    readonly jobTitleInput: By;
    readonly radioButton: By;
    readonly checkbox: By;
    readonly dropdownOption: By;
    readonly datepicker: By;
    readonly submitButton: By;
    readonly successMessage: By;

    constructor(driver: WebDriver) {
        this.driver = driver;
        this.firstNameInput = By.id('first-name');
        this.lastNameInput = By.id('last-name');
        this.jobTitleInput = By.id('job-title');
        this.radioButton = By.id('radio-button-2');
        this.checkbox = By.id('checkbox-1');
        this.dropdownOption = By.css('option[value="1"]');
        this.datepicker = By.id('datepicker');
        this.submitButton = By.css('.btn.btn-lg.btn-primary');
        this.successMessage = By.css('.alert.alert-success');
    }
}