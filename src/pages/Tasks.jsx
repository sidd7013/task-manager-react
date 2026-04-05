
import TaskItem from "../components/TaskItem";  
import { useState, useEffect } from "react";
import { getTasks, createTask } from  "../services/taskService";   
import { deleteTaskApi, toggleTaskApi } from "../services/taskService";


function Tasks(){

   const [error, setError] = useState("");
   const [loading, setLoading] = useState(true);
   const [input, setInput] = useState("");
   const [tasks, setTasks] = useState([]);
   const [filter, setFilter] = useState("all");

   const toggleTask = (task) => {
      const updatedTask = { ...task, completed: !task.completed };

      setTasks(prevTasks =>
         prevTasks.map(t =>
            t.id === task.id ? updatedTask : t
         )
      );

     toggleTaskApi(task.id, updatedTask)
                     .catch((err) => {
                        console.error(err);
                        alert("Toggle failed ❌");
                     });

   };

   const filteredTasks = tasks.filter(task => {
                                       if (filter === "completed") return task.completed;
                                       if (filter === "pending") return !task.completed;
                                       return true;
                                 });

   const updateTaskInState = (updatedTask) => {
                                          setTasks(prevTasks =>
                                             prevTasks.map(task =>
                                                task.id === updatedTask.id ? updatedTask : task
                                             )
                                          );
                                          };                           
   const addTask = () => {
       if(input.trim() === ""){
         alert("Task cannot be empty ❗");
         return;
       }
       
       createTask({ text: input, completed: false })
         .then((response) => { 
            setTasks((prev)=>[...prev, response.data]);
            setInput("");
         })
         .catch((error) => { console.error(error); });

   };

   const deleteTask = (id) => {
      deleteTaskApi(id).then(() => {
                            setTasks(tasks.filter((task) => task.id !== id));
                        })
                        .catch((err) => console.error(err));
             };


    // Load tasks from backend
    useEffect(() => {
            setLoading(true);
            getTasks().then((response)=>{
               console.log("DATA:", response.data);
               setTasks(response.data);})
                      .catch((error)=>{
                        setError("Failed to load tasks ❌");
                        console.log(error);
                })
                      .finally(()=>setLoading(false));
         }, []);

        

    return (
      <div style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh"
         }} >

         <div style={{
               maxWidth: "400px",
               width: "100%",
               padding: "20px",
               border: "1px solid #ccc",
               borderRadius: "10px",
               boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
            }}>
         <h2>Task Manager -tasks</h2>
          
          <div style={{ marginBottom: "10px" }}>
            <button onClick={() => setFilter("all")} >All</button>
            <button onClick={() => setFilter("completed")} style={{marginLeft:"5px"}}>Completed</button>
            <button onClick={() => setFilter("pending")} style={{marginLeft:"5px"}}>Pending</button>
          </div>
          

         <input type="text" placeholder="Enter the task" value={input} onChange={(e) => setInput(e.target.value)} />
         <button style={{ marginLeft: "10px" }} onClick={addTask}>Add Task</button>

           {/* ✅ Loading */}
           {loading && <p>Loading tasks...</p>}

           {/* ✅ Error */}
           {error && <p style={{ color: "red" }}>{error}</p>}

         <ul>
            {!loading &&tasks.length === 0 && <p>No tasks found</p>}
            {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            deleteTask={deleteTask}
            toggleTask={toggleTask}
            updateTaskInState={updateTaskInState}
          />
        ))}
         </ul>
        </div>
      </div>
   )



}

export default Tasks;