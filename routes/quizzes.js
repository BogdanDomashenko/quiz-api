const express = require("express");
const { send } = require("express/lib/response");
const router = express.Router();
const recursive = require("recursive-readdir");

router.get("/list", function (req, res, next) {
  recursive("quizzes/", function (err, files) {
    const quizzes = [];
    files.forEach((file) => {
      const splittedFiles = file.split("/");
      quizzes.push(
        splittedFiles[splittedFiles.length - 1].replace(".json", "")
      );
    });
    res.send(quizzes);
  });
});

router.get("/:quizzId", function (req, res) {
  let quizz;

  try {
    quizz = require("../quizzes/" + req.params.quizzId);
  } catch (e) {
    res.status(510).send({ error_code: 510, error: "Quizz not found" });
  }
  res.send(quizz);
});

module.exports = router;
