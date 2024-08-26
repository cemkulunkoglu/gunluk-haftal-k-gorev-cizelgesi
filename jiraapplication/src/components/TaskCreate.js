import { useState, useEffect } from "react";

function TaskCreate({ onCreate, task, taskFormUpdate, onUpdate, onCancel }) {
    const [title, setTitle] = useState(task ? task.title : '');
    const [taskDesc, setTaskDesc] = useState(task ? task.taskDesc : '');

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setTaskDesc(task.taskDesc);
        }
    }, [task]);

    const handleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleTaskChange = (event) => {
        setTaskDesc(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (taskFormUpdate) {
            onUpdate(task.id, title, taskDesc);
        } else {
            onCreate(title, taskDesc);
            setTitle('');
            setTaskDesc('');
        }
    };

    const handleCancelClick = () => {
        if (onCancel) {
            onCancel();
        }
    };

    return (
        <div>
            {taskFormUpdate ?
                <div className="p-3">
                    <div className="alert alert-warning" role="alert">
                        <h6 className="alert-heading fw-bold fst-italic">Lütfen görevi düzenleyiniz!</h6>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="taskTitle" className="form-label">Görev Başlığı</label>
                        <input
                            value={title}
                            onChange={handleChange}
                            type="text"
                            className="form-control"
                            id="taskTitle"
                            placeholder="Görev başlığını girin"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="taskDescription" className="form-label">Görev Açıklaması</label>
                        <textarea
                            value={taskDesc}
                            onChange={handleTaskChange}
                            className="form-control"
                            id="taskDescription"
                            rows="5"
                            placeholder="Görev açıklamasını girin"
                        ></textarea>
                    </div>
                    <div className="d-flex justify-content-end">
                        <button type="button" className="btn btn-outline-danger mx-3" onClick={handleCancelClick}>İptal</button>
                        <button type="button" className="btn btn-outline-success" onClick={handleSubmit}>Kaydet</button>
                    </div>
                </div>
                :
                <div className="d-flex justify-content-center my-3">
                    <div className="w-75">
                        <div className="alert alert-dark" role="alert">
                            <h5 className="alert-heading fw-bold fst-italic">Lütfen bir görev ekleyiniz!</h5>
                            <hr />
                            <span className="fs-6 mb-0 fst-italic">Önce "Görev Başlığı"nı daha sonra "Görev Açıklaması"nı doldurarak "Görev Ekle" butonu ile işleminizi yapınız.</span>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="taskTitle" className="form-label">Görev Başlığı</label>
                            <input
                                value={title}
                                onChange={handleChange}
                                type="text"
                                className="form-control"
                                id="taskTitle"
                                placeholder="Görev başlığını girin"
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="taskDescription" className="form-label">Görev Açıklaması</label>
                            <textarea
                                value={taskDesc}
                                onChange={handleTaskChange}
                                className="form-control"
                                id="taskDescription"
                                rows="5"
                                placeholder="Görev açıklamasını girin"
                            ></textarea>
                        </div>
                        <div className="d-flex justify-content-end">
                            <button type="button" className="btn btn-outline-success" onClick={handleSubmit}>Görev Ekle</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default TaskCreate;
