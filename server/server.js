const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const corsOptions = {
    origin: ["http://localhost:5173"],
};

app.use(cors(corsOptions));

// Route to fetch mock data
app.get("/api/data", (req, res) => {
    const filePath = path.join(__dirname, "mock-data.json");

    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            console.error("Error reading JSON file:", err);
            return res.status(500).json({ error: "Failed to read data file" });
        }

        try {
            const jsonData = JSON.parse(data);
            res.json(jsonData);
        } catch (parseError) {
            console.error("Error parsing JSON:", parseError);
            res.status(500).json({ error: "Failed to parse JSON" });
        }
    });
});

app.listen(8080, () => {
    console.log("server started on port 8080");
});
