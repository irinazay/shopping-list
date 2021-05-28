const express = require('express')
const itemRoutes = require('./itemRoutes')
const app= express()
const ExpressError = require('./error');
app.use(express.json());


app.use('/items', itemRoutes)

app.use(function (req, res, next) {
    const err = new ExpressError("Not Found",404);
  
    // pass the error to the next piece of middleware
    return next(err);
});
  
  
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
  
    return res.json({
      error: err,
      message: err.message
    });
});


module.exports = app;