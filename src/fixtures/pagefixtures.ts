
import {test as baseTest} from '@playwright/test'; // test rename as baseTest
import { LoginPage } from '../pages/LoginPage';//test is providing the inbuilt fixtures
//(page,browser instance, request,expect) to overcome this we are using the custom fixture
import { HomePage } from '../pages/HomePage';
import { CsvHelper } from '../utils/CsvHelper';
import { SearchResultsPage } from '../pages/SearchResultsPage';

//define the type for page fixtures
// type is the custom type
type pageFixtures = {
    loginPage:LoginPage,
    homePage:HomePage,
    searchResultsPage:SearchResultsPage,
    testData:Record<string,string>[],
}
//
//extend playwright base test
export let test = baseTest.extend<pageFixtures>({
    //function name with :
    loginPage:async({page},use)=>{ // 2 parameters ( page destructuring and use is the callback)
        let loginPage = new LoginPage(page);
        await use(loginPage);
    },

    homePage:async({page},use)=>{
        let homePage = new HomePage(page);
        await use (homePage);
    },
    
    searchResultsPage:async({page},use)=>{
        let searchResultsPage = new SearchResultsPage(page);
        await use(searchResultsPage);
    },

    testData:async({},use)=> {
        let testData = CsvHelper.readCsv('src/data/loginData.csv');
        await use(testData);

    },
});

export{expect} from '@playwright/test';