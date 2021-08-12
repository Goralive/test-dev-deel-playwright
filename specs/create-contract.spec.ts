import { expect } from 'assertior';
import { CreateContractPage } from '../framework/pages/create-contract/CreateContractPage';
import { HomePage } from '../framework/pages/home/HomePage';
import { LoginPage } from '../framework/pages/login/LoginPage';
import { pageProvider, provider } from '../framework/provider';
import { Contract } from '../test-data/contract';
import { Credentials } from '../test-data/login.credentials';

describe("Create contract spec", function () {
    let page = null;
    let homePage: HomePage | null = null;
    let createContractPage: CreateContractPage | null = null;

    beforeEach(async () => {
        page = await provider.browser.init();
        let loginPage: LoginPage = pageProvider(page).main();
        homePage = await loginPage.successLogin();
    });

    afterEach(async () => {
        await provider.browser.close();
    });

    it("Create fix rate contract", async () => {
         createContractPage = await homePage.clickOnCreateContractBtn();
        await createContractPage.createFixRateContract(Contract.fixRate.name, Contract.fixRate.jobTitle, Contract.fixRate.seniority, Contract.fixRate.scope,
            Contract.fixRate.value, Contract.fixRate.specialClauseText, Contract.fixRate.country, Contract.fixRate.province);

         expect(await createContractPage.getClientjobTitle(), "Should be the same job title on contract").toEqual("QA Engineer")
         expect(await createContractPage.getClientSeniority(), "Should be the seniority on contract").toEqual("Senior (Individual Contributor Level 3)")
    });
});
