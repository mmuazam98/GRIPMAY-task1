const express = require("express");
const app = express();
const path = require("path");
const routes = require("./routes/routes");
app.use(express.json());
app.use(express.static(path.join(__dirname, "./public")));
app.set("view engine", "ejs");

app.use("/", routes);
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on https://localhost:${port}`);
});
