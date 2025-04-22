function doGet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Form Responses 1'); // Adjust sheet name if different
  var data = sheet.getDataRange().getValues();
  var lastRow = data[data.length - 1]; // Get the latest submission
  
  var json = {
    name: lastRow[1], // Column B: Name
    personalDescription: lastRow[2], // Column C: Personal Description
    education: lastRow[3], // Column D: Education
    email: lastRow[4] // Column E: Email
  };
  
  return ContentService.createTextOutput(JSON.stringify(json))
    .setMimeType(ContentService.MimeType.JSON);
}
