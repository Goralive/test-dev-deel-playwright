import { BaseFragment } from "../../../../lib/BaseFragment";
import { $element } from "../../../../lib/elements/BaseElement";
import { CreateContractPage } from "../../create-contract/CreateContractPage";


export class SideBarFragment extends BaseFragment {
    public createContractBtn: any;

    constructor(page, rootFragmentSelector = `sidebar`) {
        super(page,rootFragmentSelector)
        this.page = page;
        this.rootSelector = rootFragmentSelector;
        this.createContractBtn = $element(this.page,`ul > div:nth-of-type(2)`,"Create a Contract button");
    }

    async clickCreateContractBtn(): Promise<CreateContractPage> {
        await this.createContractBtn.click();
        return new CreateContractPage(this.page);
    }
}
