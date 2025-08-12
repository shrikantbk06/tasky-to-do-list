import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [input, setInput] = useState(''); // stores text in input box
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem('tasky-tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasky-tasks');
    console.log('Loaded from localStorage:', storedTasks);
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    console.log('Saving to localStorage:', tasks);
    localStorage.setItem('tasky-tasks', JSON.stringify(tasks));
  }, [tasks]);


  const addTask = () => {
    const trimmedInput = input.trim();

    if(!trimmedInput) {
      return;   // do nothing if theres no tasks added
    }

    const newTask = {
      id: Date.now(),   // unique id
      text: trimmedInput,
      completed: false 
    };

    setTasks([...tasks,newTask]);  // adds the new task to the end of the array
    setInput('');

  }

  const toggleTask = (id) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  return (
    <div className="app-container">
      <h1>Tasky</h1>

      <input
        type='text'
        placeholder='Enter a task...'
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={addTask} disabled={!input.trim()}>Add</button>

      <ul className='task-list'>
        {tasks.map(task => (
          <li 
            key={task.id} 
            className={`task-item ${task.completed ? 'completed' : ''}`}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            <span>{task.text}</span>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
