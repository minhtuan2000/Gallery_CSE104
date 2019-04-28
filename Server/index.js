const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

//Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Import all files
app.use(express.static(path.join(__dirname, "..")));

//Get and post data of a member
app.use("/api/members", require("./routes/api/members"));
//Update album
app.use("/api/albums", require("./routes/api/albums"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));