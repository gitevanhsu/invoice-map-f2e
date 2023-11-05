const fs = require("fs");

type I18nDataType = Array<{ [key: string]: { [key: string]: string } }>;

const appsScriptUrl =
  "https://script.google.com/macros/s/AKfycbzIxzqJdkvcghiSTP4MA1pO79MDjU3QITJIhQdhNilA1nDODu1BWNooAfbpnvv1pyhg/exec";

async function getData() {
  const res = await fetch(appsScriptUrl);
  const data: I18nDataType = await res.json();

  data.forEach((item) => {
    const fileName = Object.keys(item)[0];
    const jsonData = item[fileName];
    const pathArr = Object.keys(jsonData);
    pathArr.forEach((path) => {
      const value = JSON.stringify(jsonData[path]);
      fs.writeFile(
        `./src/app/i18n/languages/${path}/${fileName}.json`,
        value,
        (err: string) => {
          if (err) {
            throw new Error(err);
          }
        }
      );
    });
  });
}

getData();
