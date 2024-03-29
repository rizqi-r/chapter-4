const express = require("express");
const app = express();
const port = 3000;
const v1 = require("./routes/v1/index");

app.use(express.json());

app.use("/api/v1", v1);

app.listen(port, () => {
    console.log(`running on port ${port}`);
});
