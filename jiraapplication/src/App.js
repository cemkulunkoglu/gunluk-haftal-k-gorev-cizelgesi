import './App.css';
import TaskCreate from './components/TaskCreate';
import TaskList from './components/TaskList';
import React, { useEffect, useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import axios from 'axios';

function App() {
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

  useEffect(() => {
    if (tasks.length > 0) {
      setShowToast(true);
    }
  }, [tasks]);

  const deleteTaskById = async (id) => {
    console.log(id); // ID'nin doğru olup olmadığını kontrol edin
    await axios.delete(`http://localhost:3004/tasks/${id}`);
    const afterDeletingTasks = tasks.filter((task) => task.id !== id);
  
    setTasks(afterDeletingTasks);
    setToastMessage("Görev başarıyla silindi!");
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
  };

  return (
    <div className="container">
      <TaskCreate onCreate={createTask} />
      <hr />
      <TaskList tasks={tasks} onDelete={deleteTaskById} onUpdate={editTaskById} />

      <ToastContainer position="bottom-end" className="p-3">
        <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">Bildirim</strong>
            <small>Şimdi</small>
          </Toast.Header>
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default App;
