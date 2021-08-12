import { BasePage } from "../../../lib/BasePage";
import { GeneralInfoFragment } from "./fragements/create-contract-flow/GeneralInfoFragment";
import { ComplianceFragment as ComplianceFragment } from "./fragements/create-contract-flow/ComplianceFragment";
import { DefineDatesFragment } from "./fragements/create-contract-flow/DefineDatesFragment";
import { ExtrasFragment } from "./fragements/create-contract-flow/ExtrasFragment";
import { PaymentDetailsFragment } from "./fragements/create-contract-flow/PaymentDetailsFragment";
import { $element } from "../../../lib/elements/BaseElement";


export class CreateContractPage extends BasePage {
    fixedRateBtn: any;
    verifyName: any;
    verifyJobTitle: any
    verifySeniority: any;

    generalInfo: GeneralInfoFragment;
    paymentDetails: PaymentDetailsFragment;
    defineDates: DefineDatesFragment;
    extras: ExtrasFragment;
    compliance: ComplianceFragment;


    constructor(page, pageRootSelector = ".page-content") {
        super(page, pageRootSelector);
        this.generalInfo = new GeneralInfoFragment(page);
        this.fixedRateBtn = $element(this.page, `.page-content > div.row > div:nth-of-type(1)`,"Fix rate button")
        this.verifyName = $element(this.page, `${pageRootSelector} h1`)
        this.verifyJobTitle = $element(this.page, `[data-qa='job-title'] h4`)
        this.verifySeniority = $element(this.page, `[data-qa="seniority-level"] h4`)

    }

    public async createFixRateContract(name: string, jobTitle: string, seniority: string, scope: string,
                                        value: string, specialClauseText: string, country: string, province: string): Promise<void> {
        await this.fixedRateBtn.click();
        this.paymentDetails = await this.generalInfo.fillGeneralInfo(name, jobTitle, seniority, scope);
        this.defineDates = await this.paymentDetails.fillPaymentDetails(value);
        this.extras = await this.defineDates.submit();
        this.compliance = await this.extras.addSpecialClause(specialClauseText);
        await this.compliance.createFixContract(country,province)
    }

    public async getClientName(): Promise<string> {
        return this.verifyName.textContent();
    }

    public async getClientjobTitle(): Promise<string> {
        return this.verifyJobTitle.innerText();
    }
    public async getClientSeniority(): Promise<string> {
        return this.verifySeniority.innerText();
    }

    
}
