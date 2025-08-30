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
 
  return (
    <Routes>
      <Route path='/' element={<Home todos={todos} setTodos={setTodos} />} />
      <Route path='/manage' element={<Manage todos={todos} setTodos={setTodos} />} />
    </Routes>
  )
}

export default App
