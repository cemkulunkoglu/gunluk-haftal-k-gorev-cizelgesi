import TaskShow from "./TaskShow";

function TaskList({ tasks, onDelete, onUpdate }) {
    return (
        <div>
            <div className="d-flex justify-content-center">
                <h2>Görevler</h2>
            </div>
            <div className="container">
                <div className="row">
                    {tasks.map((task) => {
                        return (
                            <div className="col-md-4" key={task.id}>
                                <TaskShow task={task} onDelete={onDelete} onUpdate={onUpdate} />
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default TaskList;