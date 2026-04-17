import { useState } from "react";
import { updateTaskApi } from "../services/taskService";

function TaskItem({task,deleteTask,toggleTask,updateTaskInState}){
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(task.title);
    
    const handleUpdate = () => {
            const updatedTask = { ...task, title: editText };

            updateTaskApi(task.id, updatedTask)
                .then((res) => {
                    updateTaskInState(res.data);
                    setIsEditing(false);
                })
                .catch((err) => console.error(err));
                };
            
    return(
       <div>
            <li style={{ margin: "12px 0", display: "flex", alignItems: "center", gap: "10px" }}>
                <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task)} />
              

            {isEditing ? (<input
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                        />) :
                         (<span
                            style={{
                            textDecoration: task.completed ? "line-through" : "none"
                            }}
                        >
                            {task.title}
                        </span>)}

           <button onClick={() => setIsEditing(!isEditing)}> {isEditing ? "Cancel" : "Edit"} </button>

            {isEditing && (
            <button onClick={handleUpdate}>
                Save
            </button>
            )}
            
            <button  style={{ marginLeft: "10px" }}  onClick={() => deleteTask(task.id)}>Delete</button>

            </li>
       </div>

    );
}
export default TaskItem;