const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const database = require("./database/db")
const authenticationRouter = require("./routes/authentication")
const tasksRouter = require("./routes/tasks")

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/auth', authenticationRouter)
app.use('/api/tasks', tasksRouter)

app.use((req, res) => {
    return res.json({ error : "route not found" })
})

app.set("port", process.env.PORT || 3000);

const server = app.listen(app.get("port"), async function () {
  await database(process.env.DATABASE_URI)
    .then(() => {
      console.log("Express server listening on port " + server.address().port);
    })
    .catch((ex) => {
      console.log("Error : ", ex.message);
      process.exit();
    });
});
