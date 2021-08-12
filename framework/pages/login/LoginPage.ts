import { BasePage } from '../../../lib/BasePage';
import { Credentials } from '../../../test-data/login.credentials';
import { HomePage } from '../home/HomePage';
import { SideBarFragment } from '../fragments/side-menu/SideBarFragment';
import { LoginFragment } from './fragements/LoginFragment';

export class LoginPage extends BasePage {
    loginFragment: LoginFragment;

    constructor(page, pageRootSelector = `.login__content`) {
        super(page, pageRootSelector)
        this.loginFragment = new LoginFragment(page);
    }

    async login(email: string, password: string): Promise<HomePage> {
        await this.loginFragment.login(email, password);
        return new HomePage(this.page);
    }

    async successLogin(): Promise<HomePage> {
        await this.loginFragment.login(Credentials.successLogin.email, Credentials.successLogin.password);
        return new HomePage(this.page);
    }

    async isLoginPage(): Promise<boolean> {
        const uri = await this.page.url();
        return uri.includes("/login");
    }
}
