/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from "inquirer";
import fs from "fs";
import qr from "qr-image";

const question = {
    type: "input",
    name: "urlEntered",
    message: "Please Enter the url that you want to create into QR image: ",
}

inquirer.prompt([question]).then((answer) => {
    // Get url entered
    var url = answer.urlEntered;

    //Creating url's qr image, it default to png
    var qr_png = qr.image(url);
    qr_png.pipe(fs.createWriteStream("url.png"));

    // saving the url into a file
    fs.writeFile("urlEntered.txt", url, (err) => {
        if (err) throw err;
        console.log("Url entered have been saved!");
    });
});

