const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");

require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});

const port = process.env.PORT; 
const routes = require("./routes/routes");

const app = express();
app.use(morgan("dev"));        
app.use(helmet());           
app.use(cors());              
app.use(express.json());    

// Routes
app.use("/", routes);

// Server
app.listen(port, () => {
  try {
      console.log(`Server running on port ${port}`);
  } catch (error) {
      console.log(error);
  }
});

