
import fs from "fs";
import {parse} from 'csv-parse/sync';

export class CsvHelper {

    static readCsv(filePath:string):Record<string,string>[] { 
        return parse(fs.readFileSync(filePath,"utf-8"), {
            columns:true,    //first row as headers
            skip_empty_lines:true,
            trim:true,      //any corner spaces are there trim it
        }) as Record<string,string>[];

    }
}
//how to read data from the CSV ?
//fs is filesystem from the noje.js
//destructure the parse object from the csv-parse
//static method will by using classname
//Record<> is kind of existing collection in the js. This will help me to store data and 
// fetch that data from the CsvHelper and maintain that data and return
//readCsv(){} is the function
// automatically read everything from readCsv() is and supply kind of Record<> arrays