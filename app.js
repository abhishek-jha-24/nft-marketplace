const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
var indexRouter = require("./routes/index");
var apiRouter = require("./routes/api");
var apiResponse = require("./src/user/helpers/apiResponse");
require("dotenv").config();
const bodyParser = require("body-parser");
const restrictOrigin = require("./middlewares/restrictOrigin");
var cors = require("cors");
const app = express();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection Success!");
  })
  .catch((err) => {
    console.error("Mongo Connection Error", err);
  });

const PORT = process.env.PORT || 5000;

app.use(restrictOrigin);

app.use(express.json());
app.use(morgan("dev"));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
//To allow cross-origin requests
app.use(cors());

//Route Prefixes
app.use("/", indexRouter);
app.use("/api/", apiRouter);

// throw 404 if URL not found
app.all("*", function(req, res) {
	return apiResponse.notFoundResponse(res, "Page not found");
});

app.use((err, req, res) => {
	if(err.name == "UnauthorizedError"){
		return apiResponse.unauthorizedResponse(res, err.message);
	}
});

app.get("/ping", (req, res) => {
  return res.send({
    status: "Server is up and running",
  });
});

app.listen(PORT, () => {
  console.log("Server started listening on port : ", PORT);
});
