const express = require("express");
const db = require("../config/db");
const { request } = require("http");
const bcrypt = require("bcrypt"); // ✅ Import bcrypt for hashing passwords

const router = express.Router();

router.post("/", async(req, res) => {
    const { email, password } = req.body;
    console.log(email, password, "ghjsagjhgasjdg")
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }
    try {
        // ✅ Hash the password before saving
        const saltRounds = 10; // Higher rounds = better security but slower
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // ✅ Save user with hashed password
        const query = "INSERT INTO user (email, passwords) VALUES (?, ?)";
        db.query(query, [email, hashedPassword], (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ message: "User registered successfully!" });
        });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
})
module.exports = router;
