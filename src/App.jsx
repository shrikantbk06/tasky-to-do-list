import { useState } from 'react'
import './App.css'

function App() {
  const [input, setInput] = useState(''); // stores text in input box
  const [tasks, setTasks] = useState([]); // stores all tasks

  const addTask = () => {
    const trimmedInput = input.trim();

    if(!trimmedInput) {
      return;   // do nothing if theres no tasks added
    }

    const newTask = {
      id: Date.now(),   // unique id
      text: input,
      completed: false 
    };

    setTasks([...tasks,newTask]);  // adds the new task to the end of the array
    setInput('');

  }

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
          <li key={task.id} className='task-item'>
            {task.text}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
