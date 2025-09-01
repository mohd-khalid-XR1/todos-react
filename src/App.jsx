import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Manage from './pages/Manage'
import { useState } from 'react'

function App() {
  let localTodo = localStorage.getItem("todos")
  try {
    localTodo = JSON.parse(localTodo)
  } catch (error) {
    localTodo = []
  }
  localTodo = (localTodo && Array.isArray(localTodo)) ? localTodo : []
  const [todos, setTodos] = useState(localTodo)
  console.log(todos);
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [color, setColor] = useState('black')


  return (
    <Routes>
      <Route path='/' element={<Home
        todos={todos}
        setTodos={setTodos}
        title={title}
        description={description}
        setTitle={setTitle}
        setDescription={setDescription}
        color={color}
        setColor={setColor}
      />} />
      <Route path='/update/:id' element={<Home
        title={title}
        color={color}
        description={description}
        setTitle={setTitle}
        setDescription={setDescription}
        setColor={setColor}
        setTodos={setTodos}
      />} />
      <Route path='/manage' element={<Manage
        todos={todos}
        setTodos={setTodos}
        setTitle={setTitle}
        setDescription={setDescription}
        setColor={setColor}
      />} />
    </Routes>
  )
}

export default App
