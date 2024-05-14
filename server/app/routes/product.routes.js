module.exports = app => {
    const product = require("../controllers/product.controller.js");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/add", product.create);

    // Retrieve all product
    router.get("/", product.findAll);

    // Retrieve a single Tutorial with id
    router.get("/findOne/:id", product.findOne);

    // Update a Tutorial with id
    router.put("/update/:id", product.update);

    // Delete a Tutorial with id
    router.delete("/delete/:id", product.delete);

    // Create a new Tutorial
    router.delete("/deleteAll", product.deleteAll);

    app.use("/api/product", router);
};
