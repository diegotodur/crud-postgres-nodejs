const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config()

const port = process.env.PORT || 3000;

app.use(
    "/bootstrap",
    express.static(__dirname + "/node_modules/bootstrap/dist/css")
);
app.use(express.static(path.join(__dirname, 'src')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });
  
app.listen(port, () => {
  console.log(`Servidor frontend corriendo en http://localhost:${port}`);
});
