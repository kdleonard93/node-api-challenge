const express = require("express");
const actionData = require("../data//helpers/projectModel");
const actionMiddleware = require("../data/middleware/action-middleware");
const router = express.Router();

//GET all actions
router.get("/", (req, res) => {
  actionData
    .get()
    .then(action => {
      res.status(200).json(action);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "Actions not found."
      });
    });
});

router.post("/", actionMiddleware(), (req, res) => {
  actionData
    .insert(req.body)
    .then(newAction => {
      if (req.body.name && req.body.description) {
        res.status(200).json(newAction);
      } else {
        res.status(400).json({
          message: "Please include name and description."
        });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "Project creation failed."
      });
    });
});
