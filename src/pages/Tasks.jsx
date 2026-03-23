
import TaskItem from "../components/TaskItem";  
import { useState } from "react";


function Tasks(){

   const [input, setInput] = useState("");
   const [tasks, setTasks] = useState([]);

   const toggleTask = (indexToToggle) => {
      const updatedTasks = tasks.map((task,index) => {
         if(index === indexToToggle){
            return {...task, completed: !task.completed};
         }
         return task;
      });
      setTasks(updatedTasks);
   };

   const addTask = () => {
       if(input.trim() == ""){
         return;
       }
       setTasks([...tasks, {text: input, completed: false}]);
       setInput("");
   }

   const deleteTask = (indexToDelete) => {
       const updatedTasks = tasks.filter((tasks, index) => index != indexToDelete);
       setTasks(updatedTasks);
   };


    return (
      <div>
         <h2>Task Manager -tasks</h2>

         <input type="text" placeholder="Enter the task" value={input} onChange={(e) => setInput(e.target.value)} />
         <button onClick={addTask}>Add Task</button>

         <ul>
            {tasks.map((task, index) => (
               <TaskItem key={index} task={task} index={index} deleteTask={deleteTask}  toggleTask={toggleTask}/>
            ))}
         </ul>

      </div>
   )




}

export default Tasks;