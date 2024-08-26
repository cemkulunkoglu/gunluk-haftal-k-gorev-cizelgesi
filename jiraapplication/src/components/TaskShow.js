import { useState, useContext } from "react";
import TaskCreate from "./TaskCreate";
import { TaskContext } from '../context/task';

function TaskShow({ task }) {
    const { deleteTaskById, editTaskById } = useContext(TaskContext);
    const [showEdit, setShowEdit] = useState(false);
    const [updatedTask, setUpdatedTask] = useState(task);

    const handleDeleteClick = () => {
        deleteTaskById(task.id);
    };

    const handleEditClick = () => {
        setShowEdit(!showEdit);
    };

    const handleSubmit = async (id, updatedTitle, updatedTaskDesc) => {
        await editTaskById(id, updatedTitle, updatedTaskDesc);
        setUpdatedTask({ id, title: updatedTitle, taskDesc: updatedTaskDesc });
        setShowEdit(false);
    };

    const handleCancelClick = () => {
        setShowEdit(false);
    };

    const formatDescription = (description) => {
        return description.split('\n').map((str, index) => (
            <span key={index}>
                {str}
                <br />
            </span>
        ));
    };

    return (
        <div className="card mb-3">
            {showEdit ?
                <TaskCreate
                    task={updatedTask}
                    taskFormUpdate={true}
                    onUpdate={handleSubmit}
                    onCancel={handleCancelClick}
                />
                :
                <div>
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <h5 className="card-title">{updatedTask.title}</h5>
                        <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            title="Sil"
                            onClick={handleDeleteClick}
                        ></button>
                    </div>
                    <div className="card-body">
                        <p className="card-text">{formatDescription(updatedTask.taskDesc)}</p>
                        <div className="d-flex justify-content-end">
                            <button className="btn btn-outline-warning"
                                onClick={handleEditClick}
                            >
                                Güncelle
                            </button>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default TaskShow;
