const express = require("express");
const projectData = require("../data//helpers/projectModel");
const router = express.Router();

//GET all projects
router.get("/", (req, res, next) => {
  projectData
    .get()
    .then(project => {
      res.status(200).json(project);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: "Projects not found."
      });
    });
});

router.post("/", (req, res, next) => {
  projectData
    .insert(req.body)
    .then(newProject => {
      if (req.body.name && req.body.description) {
        res.status(200).json(newProject);
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

router.put("/", (req, res) => {
  projectData.update();
});

module.exports = router;
