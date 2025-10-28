import React, { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";

const AddTask = ({handleNewTaskAdded}) => {
	const [newTaskTitle, setNewTaskTitle] = useState("");
	const addTask = async () => {
		if(newTaskTitle.trim()) {
			try {
				await axios.post("http://localhost:5001/api/task/", {title: newTaskTitle});
				toast.success(`Nhiệm vụ ${newTaskTitle} đã được thêm vào.`);
				handleNewTaskAdded();
			} catch (error) {
				console.error("Lỗi xảy ra khi thêm task.", error);
				toast.error("Lỗi xảy ra khi thêm nhiệm vụ mới.")
			}
		} else {
			toast.error("Bạn cần nhập nội dung của nhiệm vụ")
		}
	}

	const handleKeyPress = (e) => {
		if(e.key === 'Enter') {
			AddTask();
		}
	}

	return (
		<Card className="p-6 border-0 bg-gradient-card shadow-custom-lg">
			<div className="flex flex-col gap-3 sm:flex-row">
				<Input
					type="text"
					placeholder="Cần phải làm gì ?"
					className="h-12 text-base bg-slate-50 sm:flex-1 border-border/50 focus:border-primary/50 focus:ring-primary/50"
					onChange = {(e) => setNewTaskTitle(e.target.value)}
					onKeyPress= {handleKeyPress}
				/>
				<Button 
					variant="gradient" 
					size="xl"
					onClick = {addTask}
				>
					Thêm
				</Button>
			</div>
		</Card>
	);
};

export default AddTask;
