const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
require("./startup/version")(app);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API is listening on the port ${PORT}`);
});

module.exports = app;

// console.log("Hello docker!!!");
