import { APIRequestContext } from "@playwright/test";

export class ApiHelper {
    private readonly request:APIRequestContext;
    private readonly baseURL:String;

    constructor(request:APIRequestContext, baseURL:String){
        this.request = request;
        this.baseURL = baseURL;
    }
//GET
async get(endpoint:string, headers?:Record<string, string>) {
    

}


//PUT

//POST

//DELETE

}
