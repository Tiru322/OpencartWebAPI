import {test,expect} from '../src/fixtures/pagefixtures';


test.beforeEach(async({loginPage})=>{
  await loginPage.goToLoginPage();
  await loginPage.doLogin('jane.moore442@nal.com','VJ{jnLG*h#nI');

});

//when click Run button,it will go to beforeEach and create the LoginPage object and Login after that
//create the Homepage object, then jump into the test and validate with AAA pattern
test('homepage title test',async({homePage})=>{
const pageTitle = await homePage.getHomePageTitle();
console.log('home page title is:',pageTitle);
expect(pageTitle).toBe('My Account');
});

test('logout link exist test',async({homePage})=>{
expect(await homePage.isLogoutLinkExist()).toBeTruthy(); 
});

test('home page headers exist test',async({homePage})=>{
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



