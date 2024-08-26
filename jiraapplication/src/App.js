import './App.css';
import TaskCreate from './components/TaskCreate';
import TaskList from './components/TaskList';
import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { TaskProvider, TaskContext } from './context/task';

function App() {
    return (
        <TaskProvider>
            <div className="container">
                <TaskContext.Consumer>
                    {({ createTask }) => (
                        <TaskCreate onCreate={createTask} />
                    )}
                </TaskContext.Consumer>
                <hr />
                <TaskList />

                <ToastContainer position="bottom-end" className="p-3">
                    <TaskContext.Consumer>
                        {({ showToast, toastMessage, setShowToast }) => (
                            <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
                                <Toast.Header>
                                    <strong className="me-auto">Bildirim</strong>
                                    <small>Şimdi</small>
                                </Toast.Header>
                                <Toast.Body>{toastMessage}</Toast.Body>
                            </Toast>
                        )}
                    </TaskContext.Consumer>
                </ToastContainer>
            </div>
        </TaskProvider>
    );
}

export default App;
