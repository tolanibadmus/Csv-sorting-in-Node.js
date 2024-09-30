const fs = require("fs");


fs.readFile("MockData.csv", (err, data) => {
  const sortedData = data.toString();
  const dataByRow = sortedData.split("\n");

  const recordData = [];

  for (let i = 1; i < dataByRow.length; i++) {
    const rowData = dataByRow[i];
    const rowDataAsArray = rowData.split(",");
    const serverName = rowDataAsArray[0];
    const dueDate = rowDataAsArray[rowDataAsArray.length - 1];
    recordData.push({ serverName, dueDate });
  }

  recordData.sort((a, b) => {
    const aDueDate = new Date(a.dueDate);
    const bDueDate = new Date(b.dueDate);
    return aDueDate - bDueDate;
  });

  const result = recordData.map((element) => {
    return {
      serverName: element.serverName,
      dueDate: new Date(element.dueDate),
    };
  });

  console.log(result);
});
