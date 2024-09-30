const fs = require("fs");

let result = [];
let args = process.argv;
let slicedArgs = args.slice(2);
const parsedArgs = {};
slicedArgs.forEach((arg) => {
  const [key, value] = arg.split("=");
  parsedArgs[key.replace("--", "")] = value;
});

fs.readFile("MockData.csv", (err, data) => {
  const loadedData = data.toString();
  const csvData = loadedData.split("\n");

  for (let i = 1; i < csvData.length; i++) {
    const rowDataArray = csvData[i].split(",");
    result.push({
      serverName: rowDataArray[0],
      securityLevel: rowDataArray[13],
      location: rowDataArray[7],
    });
  }

  if (parsedArgs.location) {
    result = getLocationData(result);
  }
  if (parsedArgs.securityLevel) {
    result = getSecurityData(result);
  }

  console.log(result);
});

function getLocationData(data) {
  let resultsFilteredByLocation = [];
  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    if (parsedArgs.location.toLowerCase() === element.location.toLowerCase()) {
      resultsFilteredByLocation.push(element);
    }
  }
  return resultsFilteredByLocation;
}

function getSecurityData(data) {
  let resultsFilteredBySecurity = [];
  for (let i = 0; i < data.length; i++) {
    const element = data[i];
    if (parsedArgs.securityLevel.toLowerCase() === element.securityLevel.toLowerCase()) {
      resultsFilteredBySecurity.push(element);
    }
  }
  return resultsFilteredBySecurity;
}
