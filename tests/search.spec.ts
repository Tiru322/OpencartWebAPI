
import {test,expect} from '../src/fixtures/pagefixtures';
import { HomePage } from '../src/pages/HomePage';
import { SearchResultsPage } from '../src/pages/SearchResultsPage';
import { CsvHelper } from '../src/utils/CsvHelper';


test.beforeEach(async({loginPage})=>{
  await loginPage.goToLoginPage();
  await loginPage.doLogin(process.env.USER_EMAIL!,process.env.USER_PASSWORD!);

});

//when click Run button,it will go to beforeEach and create the LoginPage object and Login after that
//create the Homepage object, then jump into the test and validate with AAA pattern


//This is my data provider
let productData  = CsvHelper.readCsv('src/data/product.csv');
for(let row of productData){
test(`verify search result count-${row.searchkey}-${row.productname}-${row.resultcount}`,async({homePage,searchResultsPage})=>{
await homePage.doSearch(row.searchkey);
expect(await searchResultsPage.getProductSearchResultsCount()).toBe(Number(row.resultcount));
});
};

for(let row of productData){
test(`verify user is able to land on the product page-${row.searchkey}-${row.productname}`,async({homePage,searchResultsPage,page})=>{
await homePage.doSearch(row.searchkey);
await searchResultsPage.selectProduct(row.productname);
expect(await page.title()).toBe(row.productname);
});
};


