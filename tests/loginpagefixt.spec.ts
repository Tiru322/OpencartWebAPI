
import {test,expect} from '../src/fixtures/pagefixtures';

import { CsvHelper } from '../src/utils/CsvHelper';
import { ExcelHelper } from '../src/utils/ExcelHelper';
import { JsonHelper } from '../src/utils/JsonHelper';

test.beforeEach(async({loginPage})=>{ // here using the hooks concepts for repetative code and this
   await loginPage.goToLoginPage();
});

test('verify login',async({loginPage})=>{
    const pageTitle = await loginPage.getLoginPageTitle()
    console.log('login page title', pageTitle);
    expect(pageTitle).toBe('Account Login');
});

test('forgotpwd link',async({loginPage})=>{
   expect(await loginPage.isForgetPwdLinkExist()).toBeTruthy();
});

test('user able to login app',async({loginPage,homePage})=>{
   await loginPage.doLogin(process.env.USER_EMAIL!,process.env.USER_PASSWORD!);
   expect.soft(await homePage.isLogoutLinkExist()).toBeTruthy();
   expect.soft(await homePage.getHomePageTitle()).toBe('My Account');
});


//Testdata with fixtures is not a great combination.It will combine the all scenario's in single tc's
//means testdata with fixtures is run in the sequential mode (Drawback)
//DD1:Sequential mode
test('login to app using wrong credentials with Data driven test', async({loginPage,testData})=>{
   for(let row of testData) {
      await loginPage.doLogin(row.usermail, row.password);
      expect(await loginPage.isInvalidLoginErrorMesgDisplayed()).toBeTruthy();
   }

});

//DD2:without fixtures ,parallel mode.read csv data directly and loop the test method row wise
let testData = CsvHelper.readCsv('src/data/loginData.csv');
for(let row of testData) {
test(`Invalid login test - ${row.usermail}-${row.password}`,async({loginPage})=>{
await loginPage.doLogin(row.usermail,row.password);
expect(await loginPage.isInvalidLoginErrorMesgDisplayed()).toBeTruthy();
});

}


let loginTestData = ExcelHelper.readExcel('src/data/loginData.csv');
for(let row of loginTestData) {
test(`Invalid login testdata with excel - ${row.usermail}-${row.password}`,async({loginPage})=>{
await loginPage.doLogin(row.usermail,row.password);
expect(await loginPage.isInvalidLoginErrorMesgDisplayed()).toBeTruthy();
});

}

let loginJsonData = JsonHelper.readJson('src/data/loginData.csv');
for(let row of loginJsonData) {
test(`Invalid login testdata with Json - ${row.usermail}-${row.password}`,async({loginPage})=>{
await loginPage.doLogin(row.usermail,row.password);
expect(await loginPage.isInvalidLoginErrorMesgDisplayed()).toBeTruthy();
});

}