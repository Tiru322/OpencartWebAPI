import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {

    //praivate Locators:
    private readonly emailid:Locator;
    private readonly password:Locator;
    private readonly loginBtn:Locator;
    private readonly forgotPasswordLink:Locator;
    private readonly loginErrorMesg:Locator;

//constructor of the class: intialize the variables

    constructor(page: Page) {
    super(page); //here why we are using super? call the basepage class constructor
    this.emailid = page.getByRole('textbox', { name: 'E-Mail Address' });
    this. password = page.getByRole('textbox', { name: 'Password' });
    this. loginBtn = page.getByRole('button', { name: 'Login' });
    this. forgotPasswordLink = page.getByRole('link', { name: 'Forgotten Password' }).first();
    this.loginErrorMesg = page.locator('.alert.alert-danger.alert-dismissible');
}

//pageactions(methods)/behaviour ofthe page.these methods are publicly availabl anyone can access
async goToLoginPage():Promise<void> {
await this.page.goto('opencart/index.php?route=account/login');
}

async getLoginPageTitle():Promise<string> {
    return await this.page.title();
}

async isForgetPwdLinkExist():Promise<boolean>{
    return await this.forgotPasswordLink.isVisible();
}
async doLogin(username:string,password:string){
    console.log(`user cred:${username} : ${password}`);
    await this.emailid.fill(username);
    await this.password.fill(password);
    await this.loginBtn.click();
}

async isInvalidLoginErrorMesgDisplayed():Promise<boolean> {
return await this.loginErrorMesg.isVisible();
}
};
//mistake i did: I was write constructor outside of the class. So don't repeat this mistake again


