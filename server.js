const express = require("express");
const bodyParser = require("body-parser");
const db = require('./models/index')
const cors = require('cors');

db.sequelize.sync();

const users = require("./routes/api/users");
const categories = require("./routes/api/categories")
const posts = require('./routes/api/posts');

const app = express();
//app.use(cors());
app.use(bodyParser.json());
app.use("/api/users", users);
app.use("/api/categories", categories);
app.use("/api/posts", posts);

const port = process.env.PORT || 8000; 
app.listen(port, () => console.log(`Server running on port ${port} !`));