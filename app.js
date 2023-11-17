const express = require("express");
const app = express();
const connectDB = require("./config/db");
const dotenv = require("dotenv");
dotenv.config();
const PORT = 8000 || process.env.PORT;

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("This is from home side");
});

app.use("/auth", require("./routes/auth"));
app.use("/product", require("./routes/product"));

app.listen(PORT, () => console.log("This is from listening port", PORT));