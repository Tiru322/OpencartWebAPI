import {test,expect} from '@playwright/test';
//AUTH_TOKEN is the global variable and store the object here

let AUTH_TOKEN = {Authorization:'Bearer d90e52d51b37cc14de752661beff7292ba0100ae4cd07b8dbbfebd6e14d63ed0'};

test('get user test',async({request})=>{
    let response = await request.get('https://gorest.co.in/public/v2/users',{
        headers:AUTH_TOKEN
    });
    //console.log(response);
    let jsonBody = await response.json();
    console.log(jsonBody); 
    console.log(response.status());
    console.log(response.statusText());
    })

    test('create new user test',async({request})=>{
        //js Object creation
        let userData = {
            name:"Tirumala322",
            email:`automation_${Date.now()}@open.com`,
            gender:"male",
            apipractice:"yes"
        };
    let response = await request.post('https://gorest.co.in/public/v2/users',{
        headers:AUTH_TOKEN,
        data:userData
    });
    //console.log(response);
    let jsonBody = await response.json();
    console.log(jsonBody); 
    console.log(response.status());
    console.log(response.statusText());
    })
    //If server is not able to processing then it will give the 422 response code with textmsg

    test('update user test',async({request})=>{
        //js Object creation
        let userData = {
            name:"Tirumala322",
            email:`automation_${Date.now()}@open.com`,
            gender:"male",
            apipractice:"No"
        };
    let response = await request.put('https://gorest.co.in/public/v2/users',{
        headers:AUTH_TOKEN,
        data:userData
    });
    //console.log(response);
    let jsonBody = await response.json();
    console.log(jsonBody); 
    console.log(response.status());
    console.log(response.statusText());
    })

    test('delete user test',async({request})=>{
        //js Object creation
        let userData = {
            name:"Tirumala322",
            email:`automation_${Date.now()}@open.com`,
            gender:"male",
            apipractice:"No"
        };
    let response = await request.delete('https://gorest.co.in/public/v2/users',{
        headers:AUTH_TOKEN,
        data:userData
    });
    //console.log(response);
    let jsonBody = await response.json();
    console.log(jsonBody); 
    console.log(response.status());
    console.log(response.statusText());
    })