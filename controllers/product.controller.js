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

exports.product_details = function (req, res, next) {
    Product.findById(req.params.id, function (err, product) {
        if (err) return next(err);
        res.send(product);
    });
};

exports.product_update = function (req, res, next) {
    Product.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        function (err, product) {
            if (err) return next(err);
            res.send("Product updated.");
        }
    );
};

// Delete a product
exports.product_delete = function (req, res, next) {
    Product.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send("Deleted successfully!");
    });
};
