import moment = require("moment");
import { BaseFragment } from "../../../../../lib/BaseFragment";
import { $element } from "../../../../../lib/elements/BaseElement";
import { PaymentDetailsFragment } from "./PaymentDetailsFragment";

export class GeneralInfoFragment extends BaseFragment {
    contractNameInput: any;

    jobTitleInp: any;
    suggestionOption: any;
    seniorityLevelInput: any;
    firstChildFromSeniorityList: any;
    scopeOfWorkTextArea: any;
    startDateInp: any;
    previousDateFromNow: any;

    nextBtn: any;

    constructor(page, rootFragmentSelector = "[data-qa='selector-seniority-level']") {
        super(page, rootFragmentSelector)
        this.page = page;
        this.rootSelector = rootFragmentSelector;
        this.contractNameInput = $element(this.page, "[name='name']", "Name input")
        this.jobTitleInp = $element(this.page, `[name='jobTitle']`, "Job title input")
        this.suggestionOption = $element(this.page, `div.suggestions-box [class$=option]:nth-of-type(3)`, "Select suggestion option")
        this.seniorityLevelInput = $element(this.page, `[data-qa='selector-seniority-level'] input:first-child`, "Seniority level input")
        this.firstChildFromSeniorityList = $element(this.page, `[class*=menu-list] div:first-child`, "Select first element from Seniority list")
        this.scopeOfWorkTextArea = $element(this.page, `textarea.textarea`, "Scope of work text area")
        this.startDateInp = $element(this.page, `[name="effectiveDate"]`,"Select calendar date")
        this.previousDateFromNow = $element(this.page,`[aria-label="${moment().subtract(1, 'days').format('MMMM D, YYYY')}"]`,"Add date")
        this.nextBtn = $element(this.page,`[type='submit']`,"Submit form")
    }

    private async fillContractName(name: string):Promise<GeneralInfoFragment> {
        await this.contractNameInput.type(name);
        return this;
    }

    private async selectJobTitle(jobTitle: string):Promise<GeneralInfoFragment> {
        await this.jobTitleInp.type(jobTitle);
        await this.jobTitleInp.click();
        await this.suggestionOption.click();
        return this;
    }

    private async selectSeniorityLvl(level: string):Promise<GeneralInfoFragment> {
        await this.seniorityLevelInput.type(level);
        await this.firstChildFromSeniorityList.click();
        return this;
    }

    private async fillScopeOfWork(text: string):Promise<GeneralInfoFragment> {
        await this.scopeOfWorkTextArea.type(text);
        return this;
    }

    private async selectPreviosDateFromNow(): Promise<GeneralInfoFragment> {
        await this.startDateInp.click();
        await this.previousDateFromNow.click();
        return this;
    }

    private async submit(): Promise<PaymentDetailsFragment> {
        await this.nextBtn.click();
        return new PaymentDetailsFragment(this.page);
    }

    public async fillGeneralInfo(name: string, jobTitle: string, seniority: string, scope: string): Promise<PaymentDetailsFragment> {
        await this.fillContractName(name);
        await this.selectJobTitle(jobTitle);
        await this.selectSeniorityLvl(seniority);
        await this.fillScopeOfWork(scope);
        await this.selectPreviosDateFromNow();

        return await this.submit();
    }
}
