
import {test,expect} from '@playwright/test';
import { LoginPage} from '../src/pages/LoginPage';
import { Homepage } from '../src/pages/HomePage';

let loginPage : LoginPage; //This is the globla variable
let homePage: Homepage;


test.beforeEach(async({page})=>{ // here using the hooks concepts for repetative code and this
  loginPage = new LoginPage(page);//code will store in global variable as (loginPage)
    await loginPage.goToLoginPage();
    homePage = new Homepage(page); //Homepage object, if remove this object it will give null reference
});//that's why here mandatory to write the object

test('verify loginpage test',async()=>{ //here page destructuring is not needed.
                                    //we are doing at the hook level
    const pageTitle = await loginPage.getLoginPageTitle()
    console.log('login page title', pageTitle);
    expect(pageTitle).toBe('Account Login');
});

test('forgotpwd link',async()=>{
   expect(await loginPage.isForgetPwdLinkExist()).toBeTruthy();
});

test('user able to login app',async()=>{
   await loginPage.doLogin('jane.moore442@nal.com','VJ{jnLG*h#nI');
   expect(await homePage.isLogoutLinkExist()).toBeTruthy();
   expect(await homePage.getHomePageTitle()).toBe('Account Login');
   
});
//here page destructuring is not needed.we are doing at the hook level