const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const db = require("./config/db");
const postRoutes = require("./routes/route");
const create = require("./routes/craeteRoute");
const login = require("./routes/login")
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/posts", postRoutes);
app.use("/api/posts/create", create);
app.use("/api/posts/login", login);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
