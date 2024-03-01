const Task = require("../models/task");

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (err) {
    console.log(`Error while createTask ${err}`);
    res.json({ success: "false", error: err });
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.json({ tasks });
  } catch (err) {
    res.json({ success: "false", error: err });
    console.log(`Error while getTasks ${err}`);
  }
};

const deleteTask = async (req, res) => {
  const id = req.params.id;
  console.log(`Delete post called with ${id}`);
  if (id) {
    try {
      const task = await Task.deleteOne({ _id: id });
      console.log(`Task deleted ${task}`);
      res.json({ success: "true" });
    } catch (err) {
      res.json({ success: "false", error: err });
      console.log(`Error while deleteTask ${err}`);
    }
  } else {
    res.json({ success: "false", error: "Please give some id." });
  }
};

const updateTask = async (req, res) => {
  const id = req.params.id;
  if (id) {
    try {
      const task = await Task.updateOne({ _id: id }, req.body);
      console.log(`Task updated with id: ${id}`);
      res.json({ success: "true", status: task });
    } catch (err) {
      res.json({ success: "false", error: err });
      console.log(`Error while updating ${err}`);
    }
  } else {
    res.json({ success: "false", error: "Please give some id." });
  }
};
module.exports = {
  createTask,
  getTasks,
  deleteTask,
  updateTask,
};
