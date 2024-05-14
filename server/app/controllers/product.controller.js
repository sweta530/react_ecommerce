const db = require("../models");
const Product = db.product;

// Create and Save a new Product
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        return res.status(400).send({ message: "Name is required!" });
    }

    // let imagePath = '';
    // // Check if a file was uploaded
    // if (req.file) {
    //     imagePath = req.file.path;
    // }

    // Create a Product
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        // image: imagePath // Saving the file path only if a file was uploaded
    });

    // Save Product in the database
    product
        .save()
        .then(data => {
            res.send({ message: "Product Added", data });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Product."
            });
        });
};


// Retrieve all products from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

    Product.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving products."
            });
        });
};

// Find a single Product by id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Product.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Product with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Product with id=" + id });
        });
};

// Update a Product by id
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Product.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Product with id=${id}. Maybe Product was not found!`
                });
            } else res.send({ message: "Product was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Product with id=" + id
            });
        });
};

// Delete a Product by id
exports.delete = (req, res) => {
    const id = req.params.id;

    Product.findByIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Product with id=${id}. Maybe Product was not found!`
                });
            } else {
                res.send({
                    message: "Product was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Product with id=" + id
            });
        });
};

// Delete all products from the database.
exports.deleteAll = (req, res) => {
    Product.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} products were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all products."
            });
        });
};
