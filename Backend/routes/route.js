const express = require("express");
const db = require("../config/db");
const { request } = require("http");

const router = express.Router();

// ✅ Create a new post
router.post("/", (req, res) => {
    const { title, content } = req.body;
    console.log(title)
    if (!title || !content) return res.status(400).json({ error: "Title and content are required" });

    const query = "INSERT INTO posts (title, content) VALUES (?, ?)";
    db.query(query, [title, content], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: result.insertId, title, content });
    });
});

// ✅ Get all posts
 router.get("/", (req, res) => {
    db.query("SELECT * FROM posts", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
 });

// ✅ Get a single post by ID
router.get("/", (req, res) => {
    const { id } = req.body
    console.log(id)
    const query = "SELECT * FROM posts WHERE id = ?";
    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.length === 0) return res.status(404).json({ error: "Post not found" });
        res.json(result[0]);
    });
});

// ✅ Update a post
router.put("/", (req, res) => {
    const { id , title, content } = req.body;
    const query = "UPDATE posts SET title = ?, content = ? WHERE id = ?";
console.log(id)
    db.query(query, [title, content, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: "Post not found" });
        res.json({ message: "Post updated successfully" });
    });
});

// ✅ Delete a post
router.delete("/", (req, res) => {
    const {id} = req.body
    const query = "DELETE FROM posts WHERE id = ?";
    
    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: "Post not found" });
        res.json({ message: "Post deleted successfully" });
    });
});
router.post("/craete", (req, res) => {
    const { email, password } = req.body;
    console.log(email,"ghjsagjhgasjdg")
})
module.exports = router;
