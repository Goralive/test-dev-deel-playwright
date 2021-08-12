import { BaseFragment } from "../../../../../lib/BaseFragment";
import { $element } from "../../../../../lib/elements/BaseElement";

export class ComplianceFragment extends BaseFragment {

    private createContractBtn: any;
    private contractorTaxResidentCountryInp: any;
    private contractorTaxResidentStateInp: any;
    private selectedOption: any;

    constructor(page, rootFragmentSelector = `[data-qa="contractor-tax-residence"]`) {
        super(page, rootFragmentSelector)
        this.createContractBtn = $element(this.page, "[theme='primary']","Create contract button");
        this.contractorTaxResidentCountryInp = $element(this.page, `${rootFragmentSelector} .select__control`, "Tax resident")
        this.contractorTaxResidentStateInp = $element(this.page, `[data-qa="contractor-tax-residence-province"] .select__control`, "Tax province")
        this.selectedOption = $element(this.page,"[class*=option--is-focused]","Selected option")
    }


    public async createFixContract(country: string, province: string) {
        await this.contractorTaxResidentCountryInp.click();
        await this.contractorTaxResidentCountryInp.type(country);
        await this.selectedOption.click();
        await this.contractorTaxResidentStateInp.click();
        await this.contractorTaxResidentStateInp.type(province);
        await this.page.click(`[class*=option--is-focused]`);
        await this.createContractBtn.click();
    }
}
