const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const mobilRouter = require("./routes/mobil.js");
const pemesananRouter = require("./routes/pemesanan.js");
const reviewRouter = require("./routes/review.js");

app.use("/api/mobil", mobilRouter);
app.use("/api/pemesanan", pemesananRouter);
app.use("/api/review", reviewRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
