
function TaskItem({task,index, deleteTask, toggleTask}){
    return(
       <div>
            <li>
                <input type="checkbox" checked={task.completed} onChange={() => toggleTask(index)} />
                <span
                    style={{
                        textDecoration: task.completed ? "line-through" : "none",
                        color: task.completed ? "gray" : "white"
                    }} >
                    {task.text}</span>
                <button onClick={() => deleteTask(index)}>Delete</button>
            </li>
       </div>

    );
}


export default TaskItem;