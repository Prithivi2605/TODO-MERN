import { useEffect, useState } from 'react'
import './App.css'
import Search from './components/Search'
import TaskPage from './components/TaskPage';
import { createTodo, fetchTodo ,deleteTodo ,editTodo} from './axios';

function App() {
  const [search, setSearch] = useState('');
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem('tasks')) || []
  )
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getTasks = async () => {
      try {
        setIsLoading(true);
        const data = await fetchTodo();
        setTasks(data);
        console.log(data)
        setIsLoading(false);
      } catch (err) { 
        console.error("Error: ", err);
      } finally {
        setIsLoading(false);
      }
    }

    getTasks();

  }, [])

  const submitTask = async (search) => {
    if (!search.trim()) return;

    try {
      const newTask = await createTodo(search);
      setTasks([...tasks, newTask]);
    } catch (err) {
      console.error("Error");
    }
  }

  const completeTask = (id) => {
    const updatedTasks = tasks.map(task => {
      if (task._id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
  
    setTasks(updatedTasks);
  
    const updatedTask = updatedTasks.find(task => task._id === id);
    if (updatedTask) {
      editTask(updatedTask); 
    }
  };
  

  const deleteTask = async (id) => {
    try {
      setTasks(prevTasks => prevTasks.filter(task => task._id !== id));
    await deleteTodo(id);
     
    } catch (err) {
      console.error("Error");
    }
  }

  const editTask = async (updatedTask) => {
    const newTasks = tasks.map(task => {
      if (task._id === updatedTask._id) {
        return { ...task, ...updatedTask };
      }
      return task;
    });
  
    setTasks(newTasks);
  
    try {
      await editTodo(updatedTask._id, updatedTask); // Pass the whole task
    } catch (err) {
      console.error("Editing Error", err);
    }
  };
  
  
  if (isLoading) return "Loading";

  return (
    <div>
      <header className='text-4xl text-black text-center py-4'>
        TODO-MERN
      </header>
    
      <Search search={search} setSearch={setSearch} submitTask={submitTask}/>
      <TaskPage tasks={tasks} completeTask={completeTask} deleteTask={deleteTask} editTask={editTask} />
      
    </div>
  )
}

export default App
