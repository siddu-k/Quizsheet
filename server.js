const express = require("express");
const bodyParser = require("body-parser");
const { google } = require("googleapis");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const auth = new google.auth.GoogleAuth({
    keyFile: "service-account.json", // Path to your service account JSON file
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const spreadsheetId = "1vgdaatdXI-PBMtfqsP2c8lpeH_tHCFjGAq9TZ1frL9E"; // New Google Sheet ID

app.post("/submit", async (req, res) => {
    const { pin, score } = req.body;

    try {
        const sheets = google.sheets({ version: "v4", auth });
        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: "Sheet1!A:B", // Update range if necessary
            valueInputOption: "USER_ENTERED",
            resource: {
                values: [[pin, score]], // Data to append
            },
        });

        res.status(200).send("Data added successfully.");
    } catch (error) {
        console.error("Error adding data to spreadsheet:", error);
        res.status(500).send("Failed to add data.");
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});