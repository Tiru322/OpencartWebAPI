import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";


export class SearchResultsPage extends BasePage {
    //praivate Locators:
    private readonly searchResults:Locator;
   

//constructor of the class: intialize the variables

    constructor(page: Page) {
    super(page);
    this.searchResults = page.locator('div.product-layout');
    
    
}

//pageactions(methods)/behaviour ofthe page.these methods are publicly availabl anyone can access
async getProductSearchResultsCount():Promise<number> {
    return await this.searchResults.count()
}

async selectProduct(ProductName:string){
    this.page.getByRole('link',{name:ProductName, exact:true}).first().click();
}



};