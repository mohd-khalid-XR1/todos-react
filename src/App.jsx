import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Manage from './pages/Manage'
import { useState } from 'react'

function App() {
  const [todos, setTodos] = useState([])
  console.log(todos);
  return (
    <Routes>
      <Route path='/' element={<Home todos={todos} setTodos={setTodos} />} />
      <Route path='/manage' element={<Manage />} />
    </Routes>
  )
}

export default App
