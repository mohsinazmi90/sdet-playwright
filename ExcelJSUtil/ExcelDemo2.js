const ExcelJS = require("exceljs");
const fileName = "download.xlsx"

const workbook = new ExcelJS.Workbook();

async function ExcelTest(theFile) {
    await workbook.xlsx.readFile(theFile);

    const worksheet = workbook.getWorksheet("Sheet1");

    const cell = worksheet.getCell(3, 2);
    cell.value = "iPhone"
    console.log(cell.value);
    await workbook.xlsx.writeFile(theFile)
}

ExcelTest(fileName);