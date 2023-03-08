const Product = require("../models/Product.model");

exports.test = function (req, res) {
    res.send("Greetings from the Test controller!");
};
exports.product_create = async function (req, res, next) {
    if (!req.body.name || !req.body.price) {
        return res.status(400).send("Product name and price are required");
    }

    let product = new Product({
        name: req.body.name,
        price: req.body.price,
    });

    try {
        await product.save();
        res.send("Product Created successfully");
    } catch (err) {
        return next(err);
    }
};

exports.product_details = async function (req, res, next) {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send("Product not found");
        }
        res.send(product);
    } catch (err) {
        return next(err);
    }
};

exports.product_update = async function (req, res) {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        });
        res.send("Product updated successfully.");
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.product_delete = async function (req, res, next) {
    try {
        await Product.findOneAndDelete(req.params.id);
        res.send("Deleted successfully!");
    } catch (err) {
        console.error(err);
        return next(err);
    }
};
