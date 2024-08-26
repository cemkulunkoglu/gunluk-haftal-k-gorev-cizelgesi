import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const TaskContext = createContext();

function TaskProvider({ children }) {
    const [tasks, setTasks] = useState([]);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    const createTask = async (title, taskDesc) => {
        const newId = tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1;

        const response = await axios.post('http://localhost:3004/tasks', {
            id: newId,
            title,
            taskDesc,
        });

        const createdTasks = [
            ...tasks,
            response.data
        ];

        setTasks(createdTasks);
        setToastMessage("Görev başarıyla eklendi!");
        setShowToast(true);
    };

    const deleteTaskById = async (id) => {
        await axios.delete(`http://localhost:3004/tasks/${id}`);
        const afterDeletingTasks = tasks.filter((task) => task.id !== id);

        setTasks(afterDeletingTasks);
        setToastMessage("Görev başarıyla silindi!");
        setShowToast(true);
    };

    const editTaskById = async (id, updatedTitle, updatedTaskDesc) => {
        await axios.put(`http://localhost:3004/tasks/${id}`, {
            id,
            title: updatedTitle,
            taskDesc: updatedTaskDesc
        });

        const updatedTasks = tasks.map((task) => {
            if (task.id === id) {
                return { id, title: updatedTitle, taskDesc: updatedTaskDesc };
            }
            return task;
        });

        setTasks(updatedTasks);
        setToastMessage("Görev başarıyla güncellendi!");
        setShowToast(true);
    };

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('http://localhost:3004/tasks');
                setTasks(response.data);
            } catch (error) {
                console.error("Görevler yüklenirken hata oluştu", error);
            }
        };

        fetchTasks();
    }, []);

    return (
        <TaskContext.Provider value={{ tasks, createTask, deleteTaskById, editTaskById, showToast, toastMessage, setShowToast }}>
            {children}
        </TaskContext.Provider>
    );
}

export { TaskProvider, TaskContext };
