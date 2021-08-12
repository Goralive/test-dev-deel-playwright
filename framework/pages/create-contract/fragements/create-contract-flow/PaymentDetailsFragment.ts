import { BaseFragment } from "../../../../../lib/BaseFragment";
import { $element } from "../../../../../lib/elements/BaseElement";
import { DefineDatesFragment } from "./DefineDatesFragment";

export class PaymentDetailsFragment extends BaseFragment {
     howMuchInp: any;
     currencyList: any;
     currencyGBP: any;
     perList: any;
     perWeek: any;

     nextBtn: any;

    constructor(page,rootFragmentSelector = ".ffQNeYR") {
        super(page,rootFragmentSelector)
        this.howMuchInp = $element(this.page, "[name='rate']", "Add amont to how much input field");
        this.currencyList = $element(this.page, `[data-qa="currency-select"]`,"Select currency")
        this.currencyGBP = $element(this.page,`[id$=option-37]`,"Select British Pounds")
        this.perList = $element(this.page, `[data-qa="cycle-select"] div[class*=value-container]`, "Per list")
        this.perWeek = $element(this.page,`#react-select-4-option-0`, "Per Week")
        this.nextBtn = $element(this.page, `[type='submit']`, "Next button")
    }

    public async fillPaymentDetails(value: string): Promise<DefineDatesFragment>{
        await this.fillHowMuch(value);
        await this.selectCurrency();
        await this.selectPerWeek();

        return await this.submit();
    }

    private async fillHowMuch(value: string) {
        await this.howMuchInp.type(value);
    }

    private async selectCurrency() {
        await this.currencyList.click();
        await this.currencyGBP.click();
    }

    private async selectPerWeek() {
        await this.perList.click();
        await this.perWeek.click();
    }

    private async submit(): Promise<DefineDatesFragment> {
        await this.nextBtn.click();
        return new DefineDatesFragment(this.page);
    }
}
