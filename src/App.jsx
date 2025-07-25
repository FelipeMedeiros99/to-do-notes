import { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { TbAspectRatio } from "react-icons/tb";

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
  const [task, setTask] = useState({value: "", isEditing: false, index: null});
  // const [isEditing, setIsEditing] = useState({isEditing: false, index: null})

  const updateLocalStorageTasks = (newValue) => {
    localStorage.setItem("tasks", JSON.stringify(newValue));
  }

  const handleInput = (e) => {
    setTask(prev => ({...prev, value: e.target.value}));
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
    if(!task.value.trim()) return;
    setTasks(prev => {
      if(!task.isEditing){
        const allTasks = [...prev, { isChecked: false, task: task.value, date: getDate()}];
        updateLocalStorageTasks(allTasks);
        return allTasks;
      }else{
        const allTasks = [...prev]
        allTasks[task.index] = {...allTasks[task.index], task: task.value}
        // { isChecked: false, task: task, date: getDate()}];
        updateLocalStorageTasks(allTasks);
        return allTasks;
      }
    });
    setTask({value: "", isEditing: false, index: null});
  }

  const clearTasks = () => {
    const wantClear = window.confirm("Deseja apagar as ocorrências concluídas?")
    if(wantClear){
      setTasks(prev=>{
        const copy = prev.filter((task)=>!task.isChecked)
        updateLocalStorageTasks(copy);
        return copy
      })
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

  const editTask = (task, index) => {
    setTask({value: task.task, isEditing: true, index: index})
  }


  return (
    <form className="main" onSubmit={saveTask}>
      <h1>Ocorrências de plantão</h1>
      <div className="container-new-todo">
        <textarea type="submit" placeholder="Adicionar ocorrência" value={task.value} onChange={handleInput} className="new-todo-input" />
        <button type="submit" className="save-button">Salvar</button>
      </div>
      {tasks.map((task, index) => (
        <div className="container-task" key={index}>
          <div className="checkbox-container" onClick={() => changeTaskCheck(index)}>
            <input type="checkbox" checked={task?.isChecked} className="checkbox"/>
            <label className={task?.isChecked ? "task-checked" : "task"}>{task?.task}</label>
          </div>
          <div className="icon-container">
            {/* <FaRegTrashAlt className="icon" onClick={() => deleteTask(index)} /> */}
            <FiEdit className="icon" onClick={()=>editTask(task, index)}/>
          </div>

          <p className="date">{task.date}</p>
        </div>
      ))}

      {tasks.length===0 && 
        <p className="empty-message">Sem ocorrências 😊</p>
      }

      <button type="button" className="clear-button" onClick={clearTasks}>Limpar concluídas</button>
    </form>
  );
}

export default App;
