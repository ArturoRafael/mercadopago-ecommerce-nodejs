var express = require("express");
var exphbs = require("express-handlebars");
const mercadopago = require("mercadopago");
mercadopago.configure({
  integrator_id: "dev_24c65fb163bf11ea96500242ac130004",
  access_token:
    "APP_USR-2572771298846850-120119-a50dbddca35ac9b7e15118d47b111b5a-681067803",
});

var port = process.env.PORT || 3000;

var app = express();
app.use(express.urlencoded({ extended: false }));
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use(express.static("assets"));

app.use("/assets", express.static(__dirname + "/assets"));

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

app.get("/ipn", function (request, res) {
  res.status(200).send(res.body ? res.body : "");
});

app.listen(port);
