import Task from "../models/Task.js";

export const getAllTask = async (req,res) => {
  try {
    const tasks = await Task.find().sort({createdAt: -1});
    res.status(200).json(tasks)
  } catch (error) {
    console.error("call getAllTask failed:", error)
    res.status(500).json({message: 'error server'})
  }
}

export const createTask = async (req,res) => {
  try {
    const {title} = req.body; // LẤy title từ client gửi lên
    const task = new Task({title})

    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error("call createTask failed:", error)
    res.status(500).json({message: 'error server'})
  }
}

export const updateTask = async (req,res) => {
  try {
    const {title, status, completedAt} = req.body; // Lấy thông tin từ client gửi lên
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title,
        status,
        completedAt
      },
      {new : true} // Cái này để trả về giá trị sau khi update, nếu không có thì nó vẫn trả về giá trị khi chưa updated
    )
    if(!updatedTask) {
      return res.status(404).json({message : "task undefinde"})
    }
    res.status(200).json(updatedTask)
  } catch (error) {
    console.error("call updatedTask failed:", error)
    res.status(500).json({message: 'error server'})
  }
}

export const deleteTask = async (req,res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if(!deletedTask) {
      return res.status(400).json({message : "task undefined"})
    }
    res.status(200).json(deletedTask);
  } catch (error) {
    console.error("call deletedTask failed:", error)
    res.status(500).json({message: 'error server'})
  }
}