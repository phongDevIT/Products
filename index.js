const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

const productRouter = require("./routes/product.route");

async function connect() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/ProductApp", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/products", productRouter);
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});

connect();
