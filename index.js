const {convertXML} = require("simple-xml-to-json")
const { toXML } = require('jstoxml');
const fs = require('node:fs');

const strArr = ["otp", "one time password", "do not share", "amt due"];
const locArr = ["BT-SPOORS", "AX-IPRUMF", "TM-SAMSNG", "BP-LNKART",
  "BP-DLHVRY", "JA-TRAIND", "VM-ICICIT", "JX-SBIBNK", "JK-SBIBNK", "JA-JIOVOC", "VM-HDFCLI", "VM-TGSPDC", "JM-HDFCLI", "AD-HDFCBK",
  "AIRDOT", "AX-FSTCRY", "VK-LNKART", "AD-XPBEES", "AD-FSTCRY", "BX-SBIINB", "AX-HDFCLI", "JM-620045", "VD-MYGOVT",
"BX-CBSSBI", "AX-AIRBIL", "AD-HDFCLI", "JD-SBIPSG", "BZ-SBIINB", "AX-AIRTEL", "AX-650018", "BX-LICIND", "JD-SBIBNK", "VM-HDFCBK",
"VM-HDFCBK", "JD-HDFCBK", "VD-HDFCBK", "AX-HDFCBK", "AX-ICICIT", "AD-ICICIT", "AD-AIRDOT", "VM-SBICRD"];

const xmlToConvert = fs.readFileSync(__dirname + '/sms-20241206131306.xml', {
    encoding: 'UTF8'
})

const json = convertXML(xmlToConvert);
// console.log("--------------json.smses.children: ", json.smses.children);
const tempArr = ((json || {}).smses || {}).children || [];
const newArr = [];
tempArr.forEach(element => {
  // if (element.mms) {
  //   newArr.push(element);
  // }
  if (element.sms) {
    // strArr.forEach(str => {
      
    // });
    var p = true;
    for (var i=0; i<strArr.length; i++) {
      if ((element.sms.body || "").toLowerCase().includes(strArr[i])) {
        p = false;
        break;
      }
    }
    if (p && locArr.indexOf(element.sms.address) !== -1) {
      p = false;
    }
    if (p && element.sms.readable_date.substring(7, 11) < 2024) {
      p = false;
    }
    if (p) {
      newArr.push(element);
    }
    // console.log("==============element.sms.body", (element.sms.body || "").toLowerCase());
  }
});
console.log("====================tempArr", tempArr.length, " =======newArr", newArr.length);
json.smses.children = newArr;

// toXML(content, {});
// fs.writeFile('temp.json', json, err => {
//     if (err) {
//       console.error(err);
//     } else {
//       // file written successfully
//     }
//   });

fs.writeFile("temp.json", JSON.stringify(json), (err) => {
  if (err) console.log(err);
  else {
      
  }
});