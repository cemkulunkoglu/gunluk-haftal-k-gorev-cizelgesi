import './App.css';
import TaskCreate from './components/TaskCreate';
import TaskList from './components/TaskList';
import React, { useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

function App() {
  const [tasks, setTasks] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const createTask = (title, taskDesc) => {
    const createdTasks = [
      ...tasks, {
        id: Math.round(Math.random() * 999999),
        title,
        taskDesc
      }
    ];

    setTasks(createdTasks);
    setToastMessage("Görev başarıyla eklendi!");
    setShowToast(true);
  };

  const deleteTaskById = (id) => {
    const afterDeletingTasks = tasks.filter((task) => {
      return task.id !== id;
    });

    setTasks(afterDeletingTasks);
    setToastMessage("Görev başarıyla silindi!");
    setShowToast(true);
  };

  const editTaskById = (id, updatedTitle, updatedTaskDesc) => {
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
