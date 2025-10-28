import express from 'express';
import taskRouter from './routes/tasksRouter.js';
import { connectDB } from './config/db.js';
import dotenv from "dotenv";
import cors from 'cors'

const PORT = process.env.PORT || 5001
const app = express();

dotenv.config();
// Middleware để kiểm tra xem dữ liệu truyền vào có phải file json không  
app.use(cors({origin:"http://localhost:5173"}))
app.use(express.json());
// Cors dùng để cho phép cổng http://localhost:5173 truy cập vào database
// Để biết mình muốn khởi tạo api từ tệp mới
app.use("/api/task",taskRouter)

connectDB().then(() => {
  // lắng nghe ở công 5001
  app.listen(PORT, () => {
    console.log(`server start at port ${PORT}`)
  })
})

// Việc bê app.listen vào hàm then để xác minh chỉ khi kết nối được với db thì server mới thực sự chạy ở cổng 5001