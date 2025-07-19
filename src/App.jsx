import { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";

function App() {
  const [tasks, setTasks] = useState(() => {
    const localTasks = localStorage.getItem("tasks")
    if (!localTasks) {
      localStorage.setItem("tasks", "[]")
      return [];
    } else {
      return JSON.parse(localTasks)
    }
  })
  const [newTask, setNewTask] = useState("");

  const updateLocalStorageTasks = (newValue) => {
    localStorage.setItem("tasks", JSON.stringify(newValue));
  }

  const handleInput = (e) => {
    setNewTask(e.target.value);
  }

  const saveTask = (e) => {
    e.preventDefault();
    if(!newTask) return;
    setTasks(prev => {
      const allTasks = [...prev, { isChecked: false, task: newTask }];
      updateLocalStorageTasks(allTasks);
      return allTasks;
    });
    setNewTask("");
  }

  const clearTasks = () => {
    const confirmClear = window.confirm("Deseja limpar todas as tasks?")
    console.log(confirmClear)
    if(confirmClear){
      setTasks([]);
      updateLocalStorageTasks([]);
    }
  }

  const changeTaskCheck = (index) => {
    setTasks(prev => {
      const copy = [...prev];
      copy[index] = { isChecked: !copy[index].isChecked, task: prev[index].task };
      updateLocalStorageTasks(copy);
      return copy;
    })
  }

  const deleteTask = (index) => {
    setTasks(prev => {
      const copy = [...prev];
      copy.splice(index, 1);
      updateLocalStorageTasks(copy);
      return copy;
    })
  }


  return (
    <form className="main" onSubmit={saveTask}>
      <input type="text" placeholder="Nova task" value={newTask} onChange={handleInput} className="new-todo-input" />

      {tasks.map((task, index) => (
        <div className="container-task" key={index}>
          <div className="checkbox-container" onClick={() => changeTaskCheck(index)}>
            <input type="checkbox" checked={task?.isChecked} className="checkbox"/>
            <label className={task?.isChecked ? "task-checked" : "task"}>{task?.task}</label>
          </div>
          <div className="icon-container">
            <FaRegTrashAlt className="icon" onClick={() => deleteTask(index)} />
          </div>
        </div>
      ))}

      {tasks.length===0 && 
        <p className="empty-message">Você ainda não tem tasks. Que tal criar uma? 😊</p>
      }

      <button type="button" className="clear-button" onClick={clearTasks}>Limpar tasks</button>
    </form>
  );
}

export default App;
