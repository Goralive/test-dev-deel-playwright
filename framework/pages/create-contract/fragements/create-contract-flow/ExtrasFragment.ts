import { BaseFragment } from "../../../../../lib/BaseFragment";
import { $element } from "../../../../../lib/elements/BaseElement";
import { ComplianceFragment } from "./ComplianceFragment";

export class ExtrasFragment extends BaseFragment {
    private nextBtn: any;
    private specialClauseBtn: any;
    private specialClauseTextArea: any;

    constructor(page, rootFragmentSelector = `[data-qa="special-clause-card"]`) {
        super(page, rootFragmentSelector)
        this.specialClauseBtn = $element(this.page, `${rootFragmentSelector} button`, "Special Clause button")
        this.specialClauseTextArea = $element(this.page, `${rootFragmentSelector} textarea`, "Special Clause text area")
        this.nextBtn = $element(this.page,`button[theme='primary']`,"Next button")
    }

    public async addSpecialClause(text: string): Promise<ComplianceFragment> {
        await this.specialClauseBtn.click();
        await this.specialClauseTextArea.type(text);
        return await this.submit();
    }

    private async submit(): Promise<ComplianceFragment> {
        await this.nextBtn.click();
        return new ComplianceFragment(this.page);
    }
}
