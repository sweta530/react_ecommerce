module.exports = app => {
    const users = require("../controllers/users.controller.js");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/add", users.create);

    // Retrieve all users
    router.get("/", users.findAll);

    // Retrieve login users
    router.post("/login", users.login);

    // Retrieve a single Tutorial with id
    router.get("/findOne/:id", users.findOne);

    // Update a Tutorial with id
    router.put("/update/:id", users.update);

    // Delete a Tutorial with id
    router.delete("/delete/:id", users.delete);

    // Create a new Tutorial
    router.delete("/deleteAll", users.deleteAll);

    app.use("/api/users", router);
};
