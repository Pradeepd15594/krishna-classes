/* ******CONFIGURE CONFIG FILE FORM PROJET****** */
// process.env.NODE_ENV = 'dev'; // dev, qa, production,staging
// let config = require('./env/' + process.env.NODE_ENV + '.js');
const config = require('./env/index')
/* ********CONFIGURE CONFIG FILE FORM HOME PATH****** */
/* let fs = require('fs');

function getUserHome() {
    return process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
}

let configPath = getUserHome();
let selectedConfigPath;
let config ={};

process.env.NODE_ENV = 'dev';// dev, qa, production

if (process.env.NODE_ENV === "dev") {
    selectedConfigPath = configPath + '/dev_config.json';
} else if (process.env.NODE_ENV === "qa") {
    selectedConfigPath = configPath + '/qa_config.json';
} else if (process.env.NODE_ENV === "prod") {
    selectedConfigPath = configPath + '/prod_config.json';
}


if (fs.existsSync(selectedConfigPath)) {
     config = JSON.parse(fs.readFileSync(selectedConfigPath));
} else {
    //console.log('CONFIG FILE DOESNT EXIST AT '+selectedConfigPath);
    process.exit();
}



 */

module.exports = config;