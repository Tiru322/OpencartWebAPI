import {test,expect} from '@playwright/test';
import { LoginPage } from "../src/pages/LoginPage";
import { Homepage } from "../src/pages/HomePage";

let loginPage:LoginPage;//as global variable, I can able to use other test also

let homePage:Homepage; //as global variable, I can able to use other test also

test.beforeEach(async({page})=>{ // here using the hooks concepts for repetative code and this
  loginPage = new LoginPage(page);//code will store in global variable as (loginPage)
    await loginPage.goToLoginPage();//for every page goToLoginPage() is the mandatory. for this reason we put in before each 
    await loginPage.doLogin('jane.moore442@nal.com','VJ{jnLG*h#nI');
    homePage = new Homepage(page);
});
//when click Run button,it will go to beforeEach and create the LoginPage object and Login after that
//create the Homepage object, then jump into the test and validate with AAA pattern
test('homepage title test',async()=>{
const pageTitle = await homePage.getHomePageTitle();
console.log('home page title is:',pageTitle);
expect(pageTitle).toBe('My Account');
});

test('logout link exist test',async()=>{
expect(await homePage.isLogoutLinkExist()).toBeTruthy(); 
});

test('home page headers exist test',async()=>{
    let allHeaders = await homePage.getHomePageHeaders();
    console.log('homepage headers:',allHeaders);
    expect.soft(allHeaders).toHaveLength(4);
    expect.soft(allHeaders).toEqual([ //
        'My Account',          // here comparing the array(actual header) to array(expected header)
        'My Orders',
        'My Affiliate Account',
        'Newsletter'
    ])
});

//here page destructuring is not needed.we are already doing at the hook level