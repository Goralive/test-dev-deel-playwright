import { BasePage } from "../../../lib/BasePage";
import { CreateContractPage } from "../create-contract/CreateContractPage";
import { SideBarFragment } from "../fragments/side-menu/SideBarFragment";

export class HomePage extends BasePage {
  dashboardMenuItem: any;
  sideBarFragment: SideBarFragment

  constructor(page, pageRootSelector = `[data-qa='heading']`) {
    super(page, pageRootSelector);
    this.sideBarFragment = new SideBarFragment(page);
  }

  async clickOnCreateContractBtn(): Promise<CreateContractPage> {
    return await this.sideBarFragment.clickCreateContractBtn();
  }
}
