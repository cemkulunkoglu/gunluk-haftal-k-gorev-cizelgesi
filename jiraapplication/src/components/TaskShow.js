import { useState } from "react";
import TaskCreate from "./TaskCreate";

function TaskShow({ task, onDelete, onUpdate }) {
    const [showEdit, setShowEdit] = useState(false);

    const formatDescription = (description) => {
        return description.split('\n').map((str, index) => (
            <span key={index}>
                {str}
                <br />
            </span>
        ));
    };

    const handleDeleteClick = () => {
        onDelete(task.id);
    };

    const handleEditClick = () => {
        setShowEdit(!showEdit);
    };

    const handleSubmit = (id, updatedTitle, updatedTaskDesc) => {
        setShowEdit(false);
        onUpdate(id, updatedTitle, updatedTaskDesc);
    };

    const handleCancelClick = () => {
        setShowEdit(false);
    };

    return (
        <div className="card mb-3">
            {showEdit ?
                <TaskCreate 
                    task={task} 
                    taskFormUpdate={true} 
                    onUpdate={handleSubmit} 
                    onCancel={handleCancelClick} 
                />
                :
                <div>
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <h5 className="card-title">{task.title}</h5>
                        <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            title="Sil"
                            onClick={handleDeleteClick}
                        ></button>
                    </div>
                    <div className="card-body">
                        <p className="card-text">{formatDescription(task.taskDesc)}</p>
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
