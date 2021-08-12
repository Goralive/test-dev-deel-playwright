import { BaseFragment } from "../../../../../lib/BaseFragment";
import { $element } from "../../../../../lib/elements/BaseElement";
import { ExtrasFragment } from "./ExtrasFragment";

export class DefineDatesFragment extends BaseFragment {
    private nextBtn: any;

    constructor(page, rootFragmentSelector = `[data-qa="define-dates-of-contract"]`) {
        super(page, rootFragmentSelector)
        this.nextBtn = $element(this.page,`[type=submit]`,"Next button")
    }

    public async submit(): Promise<ExtrasFragment> {
        await this.nextBtn.click();
        return new ExtrasFragment(this.page);
    }
}
