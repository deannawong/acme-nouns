const express = require("express");
const path = require("path");
const chalk = require("chalk");

const PORT = 3000;
const app = express();
app.use(express.json()); // must include this to create an app.post

const { db, models, seed } = require("./db/index.js");
const { Places, People, Things } = models;

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "./index.html"));
});
// Posting???
app.post("/api/people", (req, res, next) => {
  People.create(req.body)
    .then(person => people.findAll())
    .then(people => {
      res.send(people);
    })
    .catch(e => {
      console.log("Error creating new person");
      next(e);
    });
});

// app.get("/api/places", (req, res, next) => {
//   Places.findAll({ include: [People] })
//     .then(places => {
//       res.send(places);
//     })
//     .catch(e => {
//       console.log("Error getting all places", e);
//       next(e);
//     });
// });

// app.get("/api/people", (req, res, next) => {
//   People.findAll({ include: [Things] })
//     .then(people => {
//       res.send(people);
//     })
//     .catch(e => {
//       console.log("Error getting all people", e);
//       next(e);
//     });
// });

// app.get("/api/things", (req, res, next) => {
//   Things.findAll()
//     .then(things => {
//       res.send(things);
//     })
//     .catch(e => {
//       console.log("Error getting all things", e);
//       next(e);
//     });
// });

//USING Object.entries and forEach to grab all models // dry routes

Object.entries(db.models).forEach(([name, model]) => {
  app.get(`/api/${name}`, (req, res, next) => {
    model
      .findAll()
      .then(item => {
        res.send(item);
      })
      .catch(e => {
        console.log(chalk.red(`Error getting all ${name}`));
        next(e);
      });
  });
});

app.get("/api/people/:id", (req, res, next) => {
  People.findByPk(req.params.id)
    .then(personOrEmpty => {
      if (!personOrEmpty) {
        res.sendStatus(404);
      } else {
        res.send(personOrEmpty);
      }
    })
    .catch(e => {
      console.log(`Error person with ID: ${req.params.id}`);
      next(e);
    });
});

db.sync({ force: true })
  .then(() => seed())
  .then(() => {
    app.listen(PORT, () => {
      console.log("db models", Object.entries(db.models));
      console.log(
        chalk.cyan(`Application started on http://localhost:${PORT}`)
      );
    });
  });
