const express = require("express");
const cors = require("cors");
require("dotenv").config();
const usersRoute = require("./Routes/userRoutes");
const petRoutes = require("./Routes/petRoutes");
const app = express();
const PORT = process.env.PORT || 8080;
const dbConnection = require("./knex/knex");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));
app.use(cookieParser());
app.use("/users", usersRoute);
app.use("/pets", petRoutes);

dbConnection.migrate.latest().then((migration) => {
  if (migration) {
    console.log("connected to DB", migration);
    app.listen(PORT, () => {
      console.log("im listening");
    });
  }
});
