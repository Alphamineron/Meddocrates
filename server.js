console.log("Server is Starting");

const express = require('express');
var cors = require("cors");


const PORT = 5500;
const app = express();
app.use(cors());

var whitelist = [
    "http://localhost:1337/",
    "https://localhost:1337/",
    "http://localhost:1337/sales",
    "http://localhost:1337/medicine",
    "http://localhost:1337/medicines/expired",
    "http://localhost:1337/sales/roed/",
    "http://localhost:1337/sales/tsalesdom/",
    "http://localhost:1337/sales/recommendation/",
    /\.localhost:1337\.in$/
];
var corsOptions = {
origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
    callback(null, true);
    } else {
    callback(new Error("Not allowed by CORS"));
    }
}
};

const server = app.listen(PORT, listening);
function listening() {
    console.log(`Server is listening on port: ${PORT}`);
}

app.use(express.static('.'));