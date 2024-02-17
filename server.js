/* ******************************************
 * This server.js file is the primary file of the 
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/
const express = require("express")
const env = require("dotenv").config()
const app = express()  //Express is a function here, assigned to the "APP" variable. common Node Application practice.
const static = require("./routes/static")
const expressLayouts = require("express-ejs-layouts")
const baseController = require("./controllers/baseController")
const inventoryRoute = require("./routes/inventoryRoute")
const utilities = require("./utilities")
const errorRoute = require("./routes/errorRoute")

/* ***********************
 * View Engine and Templates
 *************************/
app.set("view engine", "ejs")
app.use(expressLayouts)
app.set("layout", "./layouts/layout") // not at views root


/* ***********************
 * Routes
 *************************/
app.use(static) //used to be called router.use(). this new way of writing means that the application itself will use THIS resource.
// Index route
app.get("/", baseController.buildHome) 
app.use("/inv", inventoryRoute)
// error route
app.use("/error", utilities.handleErrors(errorRoute))
// File Not Found Route - must be last route in list
app.use(async (req, res, next) => {
  next({status: 404, message: 'SORRY FOR BEING BROKEN'})
})
//<img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaHBqZGVoMTkyMmtrYjhoaHR3Yml6c3d4OTl1a3QzOHE5em1nM25oNCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/h58E0JsuK3h3d8B1do/giphy.gif"
/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 *************************/
const port = process.env.PORT
const host = process.env.HOST

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`)
})


/* ***********************
* Express Error Handler
* Place after all other middleware
*************************/
app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav()
  console.error(`Error at: "${req.originalUrl}": ${err.message}`)
  res.render("errors/error", {
    title: err.status || 'Server Error',
    message: err.message,
    nav
  })
})