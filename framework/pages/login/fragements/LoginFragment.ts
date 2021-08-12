import { BaseFragment } from "../../../../lib/BaseFragment";
import { $element } from "../../../../lib/elements/BaseElement";


export class LoginFragment extends BaseFragment {
    email: any;
    password: any;
    submit: any;
    emailErrorText: any;
    passwordErrorText: any;

    constructor(page, rootFragmentSelector = `.login__content`) {
        super(page, rootFragmentSelector);
        this.page = page;
        this.rootSelector = rootFragmentSelector;
        this.email = $element(this.page, `[name='email']`, "Email input")
        this.password = $element(this.page, `[name='password']`, "Password input")
        this.submit = $element(this.page, `button[type='submit']`, "Log in button")
    }

    async login(email: string, password: string): Promise<void> {
        await this.email.type(email);
        await this.password.type(password);
        await this.submit.click();
    }
}
