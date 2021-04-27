var express = require("express");
var exphbs = require("express-handlebars");
var bodyParser = require('body-parser');
const mercadopago = require("mercadopago");
mercadopago.configure({
  integrator_id: "dev_24c65fb163bf11ea96500242ac130004",
  access_token:
    "APP_USR-2572771298846850-120119-a50dbddca35ac9b7e15118d47b111b5a-681067803",
});

var port = process.env.PORT || 3000;

var app = express();
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use(express.static("assets"));
app.use(bodyParser.json({limit: "50mb"}));
app.use("/assets", express.static(__dirname + "/assets"));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header(
  	'Access-Control-Allow-Headers', 
  	'Authorization, Origin, X-Requested-With, Content-Type, Accept');
  if(req.method == 'OPTIONS'){
  	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  	return res.status(200).json({});
  }
  next();  
});

app.get("/", function (req, res) {
  res.render("home");
});

app.get("/detail", function (req, res) {
  res.render("detail", req.query);
});

app.get("/failure", function (request, res) {
  res.render("failure", request.query);
});

app.get("/pending", function (request, res) {
  res.render("pending", request.query);
});

app.get("/success", function (request, res) {
  res.render("success", request.query);
});

app.post("/notifications", function (request, res) {
  console.log(request.body);
  res.status(200).send("Ok");
});

app.listen(port, () => {
  console.log("Server is running");
});
