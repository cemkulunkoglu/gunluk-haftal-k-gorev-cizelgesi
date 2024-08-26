import { useContext } from "react";
import TaskShow from "./TaskShow";
import { TaskContext } from '../context/task';

function TaskList() {
    const { tasks } = useContext(TaskContext);

    return (
        <div>
            <div className="d-flex justify-content-center">
                <h2>Görevler</h2>
            </div>
            <div className="container">
                <div className="row">
                    {tasks.map((task) => (
                        <div className="col-md-4" key={task.id}>
                            <TaskShow task={task} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default TaskList;
