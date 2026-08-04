const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const DB_PATH = path.join(__dirname, "database.json");

// ---------- Middleware ----------
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ---------- Helpers ----------
function readDatabase() {
    const raw = fs.readFileSync(DB_PATH, "utf-8");
    return JSON.parse(raw);
}

function writeDatabase(data) {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 4), "utf-8");
}

// ---------- Routes ----------

// GET /profile -> returns the current profile object
app.get("/profile", (req, res) => {
    try {
        const db = readDatabase();
        res.json(db.profile);
    } catch (err) {
        console.error("Error reading profile:", err);
        res.status(500).json({ error: "Failed to read profile data." });
    }
});

// PATCH /profile -> updates any subset of {name, bio, coursework}
app.patch("/profile", (req, res) => {
    try {
        const db = readDatabase();
        const { name, bio, coursework } = req.body;

        if (typeof name === "string") db.profile.name = name;
        if (typeof bio === "string") db.profile.bio = bio;
        if (typeof coursework === "string") db.profile.coursework = coursework;

        writeDatabase(db);
        res.json(db.profile);
    } catch (err) {
        console.error("Error updating profile:", err);
        res.status(500).json({ error: "Failed to update profile data." });
    }
});

// ---------- Start server ----------
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Portfolio:   http://localhost:${PORT}/index.html`);
    console.log(`Admin page:  http://localhost:${PORT}/admin.html`);
});
