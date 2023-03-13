/** Command-line tool to generate Markov text. */
const markov = require('./markov')
const fs = require('fs')
const axios = require('axios')

async function grabText(path, source) {
    if(path === "file"){
        fs.readFile(source, 'utf-8', function(err, data){
            if(err){
                console.log("error: something went wrong while reading your file. Please check to make sure path is correct")
                process.exit(1);
            }
            writeText(data)
        });
    }
    else if(path === "url"){
        try{
            let response = await axios.get(source);
            text = response.data;
            writeText(text)
        }
        catch(error){
            console.log("error: something went wrong while reading the url contents. Please check to make sure path is correct");
            process.exit(1);
        }

    }
    else{
        console.log("error: unrecognized path, please use 'file' or 'url");
        process.exit(1);

    }
}

function writeText(text){
    let mm = new markov.MarkovMachine(text);
    text = mm.makeText();

    fs.writeFile('generatedFile.txt', text, 'utf8', function(err) {
        if (err) {
            console.error(`error: There was a problem writing the file`);
            process.exit(1);
        }
        console.log("success: text generated from " + path)
    });

}

let path = process.argv[2]
let source = process.argv[3]
let text;

grabText(path, source)




