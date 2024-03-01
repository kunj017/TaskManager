const express = require("express");
const router = express.Router();
const {
  createTask,
  getTasks,
  deleteTask,
  updateTask,
} = require("../controller/task");

router.route("/").get(getTasks);

router.route("/").post(createTask);

router.route("/:id").delete(deleteTask);

router.route("/:id").patch(updateTask);

module.exports = router;
