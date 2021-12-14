const fs = require('fs');
const path = require('path');


function getInput() {
  const readline = require('readline');

  return new Promise(resolve => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question("Please enter name of new componet: ", (answer) => {
      resolve(answer);
      rl.close();
    });

  });

}



function jsonUpdate(name, type, uName) {

  let dataPath = './src/js/utils/inventory.json';

  fs.readFile(dataPath, 'utf8', (err, data) => {

    let jsonObj = JSON.parse(data);
        jsonObj.data.push({
          "name": uName,
          "machine-name": name,
          "type": type
        });

    let jsonStr = JSON.stringify(jsonObj, null, "\t");

    fs.writeFile(dataPath, jsonStr, (err) => {
      if(err) throw err;
      console.info(`JSON Updated to file: ${dataPath}`);
    });

  });

}



function fileTreeUpdate(file, name) {

  if(!fs.existsSync(file)) {

    let output;

    if (path.extname(file) === '.js') {
      output = `import React from 'react';\n\nfunction ${name}() {\n\n\treturn (\n\t\t<div>\n\t\t\t<h1>${name}</h1>\n\t\t</div>\n\t);\n\n}\n\nexport default ${name};\n`
    }

    fs.writeFile(file, output, (err) => {
      if(err) throw err;
      console.info(`File Created: ${name}`);
    });
  }

}



(async function initCreate() {
  const name = await getInput();

  let uName = name.charAt(0).toUpperCase() + name.slice(1);
  let jsFile = path.join(__dirname, '../src/js/components/' + uName + '.js');

  await jsonUpdate(name, 'componet', uName);
  await fileTreeUpdate(jsFile, uName);

})();
