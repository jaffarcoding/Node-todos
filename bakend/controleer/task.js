import { task } from "../model/task.js";
import ErrorHandler from "../middleware/error.js";
export const newTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    await task.create({
      title,
      description,
      user: req.user,
    });
    console.log("syed jaffar omer");
    res.status(201).json({
      success: true,
      message: "Task added Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getMyTask = async (req, res, next) => {
  try {
    const userid = req.user._id;
    const tasks = await task.find({ user: userid });

    res.status(201).json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const Task = await task.findById(req.params.id);
    console.log(" syed omer khan");

    if (!Task) return next(new ErrorHandler("Task not found", 404));

    Task.isCompleted = !Task.isCompleted;
    await Task.save();

    res.status(200).json({
      success: true,
      message: "Task Updated!",
    });
  } catch (error) {
    next();
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const Task = await task.findById(req.params.id);

    if (!Task) return next(new ErrorHandler("Task not found", 404));
    await task.deleteOne();

    res.status(200).json({
      message: "Task Deleted!",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
