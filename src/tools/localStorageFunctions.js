import { orderTasksByTimestamp } from "./dataFunctions";

const storage = "tasks"

export const updateLocalStorageTasks = (newValue) => {
  localStorage.setItem(storage, JSON.stringify(newValue));
}

export const createStorage = () => {
  localStorage.setItem("tasks", "[]");
}

export const getLocalStorageData = () => {
  const localTasks = localStorage.getItem(storage)
  if (!localTasks) {
    createStorage()
    return [];
  } else {
    return orderTasksByTimestamp(JSON.parse(localTasks))
  }
}