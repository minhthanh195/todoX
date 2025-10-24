import mongoose from "mongoose";

const taskSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ["active","complete"],
    default: "active",
  },
  completedAt: {
    type: Date,
    default: null,
  }
},
{
  timestamps: true, // creatAt và updatedAt tự động thêm vào
}
);

const Task = mongoose.model("Task",taskSchema);
export default Task;