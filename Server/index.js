const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

//Import all files
app.use(express.static(path.join(__dirname, "..")));

//Get data of a member
app.use("/api/members", require("./routes/api/members"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));