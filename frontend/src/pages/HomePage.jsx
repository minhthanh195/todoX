import AddTask from "@/components/AddTask";
import DateTimeFilter from "@/components/DateTimeFilter";
import Header from "@/components/Header";
import StatsAndFilters from "@/components/StatsAndFilters";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const HomePage = () =>{
  // Buffer trong lập trình có nghĩa là gom dữ liệu lại

  const [taskBuffer, setTaskBuffer] = useState([]);
  const [activeTaskCount, setActiveTaskCount] = useState([]);
  const [completeTaskCount, setCompleteTaskCount] = useState([]);
  const [filter, setFilter] = useState("all")
  useEffect(() => {fetchTask()},[])

  const fetchTask = async () => {
    try {
      const res = await axios.get("http://localhost:5001/api/task")
      console.log(res.data)
      setTaskBuffer(res.data.tasks);
      setActiveTaskCount(res.data.activeCount);
      setCompleteTaskCount(res.data.completeCount);
    } catch (error) {
      console.log('Lỗi xảy ra khi truy xuất data task', error);
      toast.error('Lỗi xảy ra khi truy xuất data task.');
    }
  }

  const handleTaskChanged = () => {
    fetchTask();
  }

  // biến
  const filteredTasks = taskBuffer.filter((task) => {
    switch(filter) {
      case 'active':
        return task.status === 'active';
      case 'completed':
        return task.status === 'complete';
      default: 
        return true;
      }
  })
  return(
    <div className="min-h-screen w-full relative">
      {/* Cotton Candy Sky Gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `linear-gradient(45deg, #FFB3D9 0%, #FFD1DC 20%, #FFF0F5 40%, #E6F3FF 60%, #D1E7FF 80%, #C7E9F1 100%)`,
        }}
      />
      {/* Your Content/Components */}
      <div className="container pt-8 mx-auto relative z-10">
        <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
          {/* Đầu trang */}
          <Header/>
          {/* Tạo nhiệm vụ */}
          <AddTask handleNewTaskAdded={handleTaskChanged}/>
          {/* Thống kê và bộ lọc */}
          <StatsAndFilters activeTaskCount={activeTaskCount} completedTaskCount={completeTaskCount} filter={filter} setFilter={setFilter}/>
          {/* Danh sách nhiệm vụ*/}
          <TaskList filteredTasks={filteredTasks} filter={filter}/>
          {/* Phân trang và lọc theo Date */}
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <TaskListPagination/>
            <DateTimeFilter/>
          </div>
          {/* Chân trang */}
          <Footer activeTasksCount={activeTaskCount} completedTasksCount={completeTaskCount}/>
        </div>
      </div>
    </div>
  )
}

export default HomePage;