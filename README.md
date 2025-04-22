# Portfolio Website
Portfolio Website
A responsive portfolio website showcasing personal projects, skills, and contact information. The "About Me" section is dynamically updated using data submitted via a Google Form, which is processed by a Google Sheet and Google Apps Script.
Features

Responsive Design: Works on desktop, tablet, and mobile devices.
Dynamic Content: Update the "About Me" section (Name, Personal Description, Education) via a Google Form.
Project Showcase: Displays projects with modal popups for detailed views.
Smooth Navigation: Includes smooth scrolling and a hamburger menu for mobile.
Contact Form: Basic form with client-side validation (demo mode).

Tech Stack

Frontend: HTML, CSS, JavaScript
Styling: Custom CSS with Google Fonts (Roboto)
Backend (for dynamic updates): Google Forms, Google Sheets, Google Apps Script
Deployment: GitHub Pages

Prerequisites

A GitHub account for hosting the website.
A Google account for creating the Google Form, Sheet, and Apps Script.
Basic knowledge of Git, HTML, CSS, JavaScript, and Google Apps Script.

Setup and Deployment
1. Clone the Repository
Clone this repository to your local machine:
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
cd YOUR_REPOSITORY

2. Configure the Portfolio Website
The repository contains:

index.html: Main HTML file for the portfolio.
styles.css: CSS for styling the website.
script.js: JavaScript for dynamic functionality (e.g., fetching Google Form data, project rendering).

Update the following:

Google Form Link in index.html: Replace YOUR_GOOGLE_FORM_LINK in the Contact section with the actual Google Form URL:
<p>Update your portfolio information using this <a href="YOUR_GOOGLE_FORM_LINK" target="_blank">Google Form</a>.</p>


Apps Script URL in script.js: Replace YOUR_APPS_SCRIPT_WEB_APP_URL with the Google Apps Script web app URL (see step 4):
const response = await fetch('YOUR_APPS_SCRIPT_WEB_APP_URL');



3. Set Up Google Form and Sheet

Create a Google Form:

Go to Google Forms.
Create a form titled "Portfolio Information" with fields:
Name (Short answer)
Personal Description (Paragraph)
Education (Paragraph, e.g., "B.S. in Computer Science, XYZ University, 2020-2024")
Email (Short answer)


In the Responses tab, link the form to a Google Sheet (click the green Sheets icon).


Verify Google Sheet:

Open the linked Google Sheet (e.g., named "Form Responses 1").
Submit a test form entry to ensure data appears in columns: Timestamp, Name, Personal Description, Education, Email.



4. Set Up Google Apps Script

Open Apps Script:

In the Google Sheet, go to Extensions > Apps Script.

Copy and paste the following code into Code.gs:
function doGet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Form Responses 1');
  var data = sheet.getDataRange().getValues();
  var lastRow = data[data.length - 1];
  
  var json = {
    name: lastRow[1],
    personalDescription: lastRow[2],
    education: lastRow[3],
    email: lastRow[4]
  };
  
  return ContentService.createTextOutput(JSON.stringify(json))
    .setMimeType(ContentService.MimeType.JSON);
}


If your sheet name isn’t "Form Responses 1", update the getSheetByName parameter.



Deploy Web App:

Click Deploy > New Deployment > Web App.
Configure:
Execute as: Your Google account.
Who has access: Anyone (for testing; restrict in production).


Click Deploy and copy the web app URL (e.g., https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec).
Update script.js with this URL (see step 2).


Test the Web App:

Open the web app URL in a browser. You should see JSON output like:
{"name":"John Doe","personalDescription":"I’m a web developer...","education":"B.S. in CS...","email":"john@example.com"}





5. Deploy to GitHub Pages

Push Changes to GitHub:

Commit and push your changes:
git add .
git commit -m "Initial portfolio setup"
git push origin main




Enable GitHub Pages:

Go to your repository on GitHub.
Navigate to Settings > Pages.
Under "Source", select Deploy from a branch.
Choose the main branch and / (root) folder.
Click Save.
Wait a few minutes, then access your site at https://YOUR_USERNAME.github.io/YOUR_REPOSITORY.



6. Test the Website

Visit your GitHub Pages URL.
Submit a test entry via the Google Form.
Refresh the portfolio website to verify the "About Me" section updates with your Name, Personal Description, and Education.
Check the browser console (Right-click > Inspect > Console) for errors if the data doesn’t appear.

Troubleshooting

Form Data Not Appearing:
Ensure the Google Form is linked to the correct Google Sheet.
Verify the sheet name in Code.gs matches your sheet.
Check the web app URL in script.js is correct.


CORS Errors:
Ensure the Google Apps Script web app is deployed with "Anyone" access.
Host the website on HTTPS (GitHub Pages uses HTTPS by default).


JSON Errors:
Test the web app URL in a browser to confirm valid JSON output.
Verify column indices in Code.gs match your sheet’s structure.


Console Errors:
Open the browser console to view specific error messages (e.g., Failed to fetch or SyntaxError).
Share errors with collaborators or in the Issues tab for help.



Security Notes

The Google Apps Script web app is public for simplicity. In production, restrict access (e.g., validate user email).
The current setup displays the latest form submission. For multiple users, add a backend to filter data by email or ID.
Regularly update the Google Apps Script deployment to maintain access.

Contributing

Fork the repository.
Create a feature branch (git checkout -b feature/YourFeature).
Commit changes (git commit -m "Add YourFeature").
Push to the branch (git push origin feature/YourFeature).
Open a Pull Request.

License
This project is licensed under the MIT License.
Contact
Update your portfolio via the Google Form. For issues, open a ticket in the Issues tab or contact the repository owner.
