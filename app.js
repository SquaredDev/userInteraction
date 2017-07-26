const express = require('express')
const app = express()
const path = require('path')
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))



app.engine('mustache', mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')

app.use(express.static(path.join(__dirname, 'static')))

app.get("/", function(req, res, next){
  res.render("index", {thankyou:req.query.thankyou})
})

var users = []

app.post("/user/add", function (req, res, next) {
  users.push({
    fname: req.body.fname,
    lname: req.body.lname
  })
  console.log(users);
  res.redirect("/thankyou")
})

app.get("/thankyou", function (req, res, next) {
  res.send("<h1>Thank You</h1>")
})

app.listen(3000, function(){
  console.log("App running on port 3000")
})
