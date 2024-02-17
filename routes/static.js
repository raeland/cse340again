const express = require("express");  //express package is brought into the scope of the file and assigned to a local variable
const router = express.Router();  //Express "router" functionality is invoked and stored into a local variable for use [Notice the (), indicating that ROUTER is a function]

// Static Routes
// Set up "public" folder / subfolders for static files
router.use(express.static("public"));  //indicates that the Express router is to "use" the "express.static" function, this is where static resources will be found, with the public folder.
router.use("/css", express.static(__dirname + "public/css"));  //any route that contains /css is to refer to the public/css folder, which is found at the root level of the project.
router.use("/js", express.static(__dirname + "public/js"));  //any route that contains /js is to refer to the public/js folder, which is found at the root level of the project.
router.use("/images", express.static(__dirname + "public/images"));  //any route that contains /images is to refer to the public/images folder, which is found at the root level of the project.

module.exports = router;  //exports the router object, along with all of these use statements for use in other areas of the application. VERY IMPORTANTE, it canNOT be used somewhere else!


