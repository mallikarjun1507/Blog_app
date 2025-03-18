const express = require("express");
const db = require("../config/db");
const { request } = require("http");
const bcrypt = require("bcrypt"); // ✅ Import bcrypt for hashing passwords
const jwt = require("jsonwebtoken"); // ✅ Import JWT for authentication

const router = express.Router();
const SECRET_KEY = "jhgyewtuiy2673248wryiuerwyi"; // 🔒 Replace with a secure secret key

router.post("/", async(req, res) => {
    const { email, password } = req.body;
    console.log(email, password, "ghjsagjhgasjdg")
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }
    try {
        const query = "SELECT * FROM user WHERE email = ?";
        db.query(query, [email], async (err, results) => {
            if (err) return res.status(500).json({ error: "Database error" });
            if (results.length === 0) return res.status(401).json({ error: "Invalid credentials" });

            const user = results[0];

            // ✅ Check if user.password is undefined
            if (!user.passwords) {
                return res.status(500).json({ error: "Internal error: User password not found" });
            }

            // ✅ Compare the entered password with the hashed password in DB
            const isMatch = await bcrypt.compare(password, user.passwords);
            if (!isMatch) {
                return res.status(401).json({ error: "Invalid credentials" });
            }

            // ✅ Generate JWT Token (for authentication)
            const token = jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });

            res.status(200).json({ message: "Login successful", token });
        });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
})
module.exports = router;
