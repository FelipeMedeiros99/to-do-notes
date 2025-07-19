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

  const getDate = ()=>{
    const date = new Date();
    return date.toLocaleDateString("pt-Br",  {
      weekday: "short",
      year: 'numeric',    // 2025
      month: '2-digit',      // julho
      day: '2-digit',     // 19
      hour: '2-digit',    // 21
      minute: '2-digit',  // 48
      second: '2-digit',  // 10
      hour12: false       // 24h (false) ou 12h (true)
    })
  }

  const saveTask = (e) => {
    e.preventDefault();
    if(!newTask) return;
    setTasks(prev => {

      const allTasks = [...prev, { isChecked: false, task: newTask, date: getDate()}];
      updateLocalStorageTasks(allTasks);
      return allTasks;
    });
    setNewTask("");
  }

  const clearTasks = () => {
    const confirmClear = window.confirm("Deseja limpar todas as ocorrências?")
    console.log(confirmClear)
    if(confirmClear){
      setTasks([]);
      updateLocalStorageTasks([]);
    }
  }

  const changeTaskCheck = (index) => {
    setTasks(prev => {
      const copy = [...prev];
      copy[index] = {...copy[index], isChecked: !copy[index].isChecked};
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
      <h1>Ocorrências de plantão</h1>
      <input type="text" placeholder="Adicionar ocorrência" value={newTask} onChange={handleInput} className="new-todo-input" />

      {tasks.map((task, index) => (
        <div className="container-task" key={index}>
          <div className="checkbox-container" onClick={() => changeTaskCheck(index)}>
            <input type="checkbox" checked={task?.isChecked} className="checkbox"/>
            <label className={task?.isChecked ? "task-checked" : "task"}>{task?.task}</label>
          </div>
          <div className="icon-container">
            <FaRegTrashAlt className="icon" onClick={() => deleteTask(index)} />
          </div>

          <p className="date">{task.date}</p>
        </div>
      ))}

      {tasks.length===0 && 
        <p className="empty-message">Sem ocorrências 😊</p>
      }

      <button type="button" className="clear-button" onClick={clearTasks}>Limpar ocorrências</button>
    </form>
  );
}

export default App;
